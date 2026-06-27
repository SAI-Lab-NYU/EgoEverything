#!/usr/bin/env python3
"""Extract random short clips from videos referenced by a VQA JSON file.

The script infers a local dataset from each row's video_name and keyframe
image_path, resolves the corresponding source video, then writes new web-sized
MP4 clips without modifying the original videos.

Example:
    python processed_egoeverything/extract_vqa_video_clips.py \
        --vqa-json aria_everyday/VQA.json \
        --output-dir processed_egoeverything \
        --num-clips 24 \
        --clip-duration 5
"""

from __future__ import annotations

import argparse
import csv
import json
import random
import re
import subprocess
from dataclasses import dataclass, field
from pathlib import Path
from typing import Iterable


@dataclass
class VideoCandidate:
    video_name: str
    dataset: str
    source_path: Path
    image_paths: set[str] = field(default_factory=set)
    timestamps: list[float] = field(default_factory=list)
    row_count: int = 0


def run_command(cmd: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(cmd, capture_output=True, text=True, check=False)


def infer_dataset(video_name: str, image_paths: Iterable[str]) -> str:
    basenames = [Path(path).name for path in image_paths if path]
    joined = " ".join(basenames)

    if video_name.startswith("loc") or "_loc" in joined or joined.startswith("AEA_"):
        return "aria_everyday"
    if joined.startswith("Nymeria_") or re.match(r"^20\d{6}_s\d_", video_name):
        return "nymeria"
    if video_name.startswith(("cmu_", "fair_", "indiana_", "utokyo_", "upenn_", "uniandes_", "georgiatech_")):
        return "egoexo4d"
    if re.match(r"^P\d{2}-\d{8}-\d{6}$", video_name):
        return "hd-epic"
    return "unknown"


def resolve_video(repo_root: Path, dataset: str, video_name: str) -> Path | None:
    if dataset == "aria_everyday":
        seq_dir = repo_root / "aria_everyday" / video_name
        exact = seq_dir / f"AriaEverydayActivities_1.0.0_{video_name}_preview_rgb.mp4"
        if exact.exists():
            return exact
        matches = sorted(seq_dir.glob("*preview_rgb.mp4"))
        return matches[0] if matches else None

    if dataset == "nymeria":
        exact = repo_root / "nymeria" / "data" / video_name / f"{video_name}_preview_rgb.mp4"
        if exact.exists():
            return exact
        matches = sorted((repo_root / "nymeria" / "data" / video_name).glob("*.mp4"))
        return matches[0] if matches else None

    if dataset == "egoexo4d":
        base = repo_root / "egoexo4d" / "takes" / video_name / "frame_aligned_videos" / "downscaled" / "448"
        preferred = base / "ego_preview.mp4"
        if preferred.exists():
            return preferred
        matches = sorted(base.glob("*.mp4"))
        return matches[0] if matches else None

    if dataset == "hd-epic":
        participant = video_name.split("-", 1)[0]
        exact = repo_root / "hd-epic" / "HD-EPIC" / "Videos" / participant / f"{video_name}.mp4"
        return exact if exact.exists() else None

    return None


def collect_candidates(vqa_json: Path, repo_root: Path) -> tuple[list[VideoCandidate], dict[str, int]]:
    rows = json.loads(vqa_json.read_text())
    grouped: dict[tuple[str, str], VideoCandidate] = {}
    stats = {
        "rows": len(rows),
        "unresolved": 0,
        "unknown_dataset": 0,
    }

    for row in rows:
        video_name = row.get("video_name")
        if not video_name:
            stats["unresolved"] += 1
            continue

        keyframes = row.get("keyframes") or []
        image_paths = [str(kf.get("image_path", "")) for kf in keyframes if isinstance(kf, dict)]
        dataset = infer_dataset(video_name, image_paths)
        if dataset == "unknown":
            stats["unknown_dataset"] += 1
            continue

        source_path = resolve_video(repo_root, dataset, video_name)
        if source_path is None:
            stats["unresolved"] += 1
            continue

        key = (dataset, video_name)
        candidate = grouped.get(key)
        if candidate is None:
            candidate = VideoCandidate(video_name=video_name, dataset=dataset, source_path=source_path)
            grouped[key] = candidate

        candidate.row_count += 1
        candidate.image_paths.update(path for path in image_paths if path)
        for keyframe in keyframes:
            if not isinstance(keyframe, dict):
                continue
            timestamp = keyframe.get("timestamp")
            if isinstance(timestamp, (int, float)):
                candidate.timestamps.append(float(timestamp))

    return list(grouped.values()), stats


def ffprobe_duration(video_path: Path) -> float:
    cmd = [
        "ffprobe",
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "default=noprint_wrappers=1:nokey=1",
        str(video_path),
    ]
    result = run_command(cmd)
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or f"ffprobe failed for {video_path}")
    return float(result.stdout.strip())


def choose_encoder() -> list[str]:
    result = run_command(["ffmpeg", "-hide_banner", "-encoders"])
    encoders = result.stdout + result.stderr
    if "libx264" in encoders:
        return ["-c:v", "libx264", "-preset", "veryfast", "-crf", "23"]
    if "libopenh264" in encoders:
        return ["-c:v", "libopenh264", "-b:v", "1800k"]
    return ["-c:v", "mpeg4", "-q:v", "5"]


def choose_start(candidate: VideoCandidate, duration: float, clip_duration: float, rng: random.Random) -> float:
    max_start = max(0.0, duration - clip_duration)
    timestamps = [t for t in candidate.timestamps if 0.0 <= t <= duration]
    if timestamps:
        center = rng.choice(timestamps)
        jitter = rng.uniform(-8.0, 8.0)
        start = center - clip_duration / 2.0 + jitter
    else:
        start = rng.uniform(0.0, max_start) if max_start > 0 else 0.0
    return min(max(start, 0.0), max_start)


def extract_clip(
    candidate: VideoCandidate,
    output_path: Path,
    start: float,
    clip_duration: float,
    max_width: int,
    encoder_args: list[str],
) -> None:
    vf = f"scale='min({max_width},iw)':-2,setsar=1,fps=24"
    cmd = [
        "ffmpeg",
        "-hide_banner",
        "-loglevel",
        "error",
        "-y",
        "-ss",
        f"{start:.3f}",
        "-t",
        f"{clip_duration:.3f}",
        "-i",
        str(candidate.source_path),
        "-vf",
        vf,
        "-an",
        *encoder_args,
        "-movflags",
        "+faststart",
        str(output_path),
    ]
    result = run_command(cmd)
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or f"ffmpeg failed for {candidate.source_path}")


def safe_slug(value: str) -> str:
    return re.sub(r"[^A-Za-z0-9_.-]+", "_", value).strip("_")


def write_manifests(output_dir: Path, records: list[dict[str, object]]) -> None:
    jsonl_path = output_dir / "clips_manifest.jsonl"
    csv_path = output_dir / "clips_manifest.csv"

    with jsonl_path.open("w") as f:
        for record in records:
            f.write(json.dumps(record, ensure_ascii=False) + "\n")

    fieldnames = [
        "clip_path",
        "dataset",
        "video_name",
        "source_path",
        "start_sec",
        "duration_sec",
        "source_duration_sec",
        "row_count",
        "sample_image_path",
    ]
    with csv_path.open("w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for record in records:
            writer.writerow({key: record.get(key, "") for key in fieldnames})


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Extract VQA-referenced random video clips.")
    parser.add_argument("--vqa-json", type=Path, default=Path("aria_everyday/VQA.json"))
    parser.add_argument("--output-dir", type=Path, default=Path("processed_egoeverything"))
    parser.add_argument("--num-clips", type=int, default=24)
    parser.add_argument("--clip-duration", type=float, default=5.0)
    parser.add_argument("--seed", type=int, default=42)
    parser.add_argument("--max-width", type=int, default=640)
    parser.add_argument("--min-duration", type=float, default=2.0)
    parser.add_argument("--dry-run", action="store_true")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    repo_root = Path.cwd()
    output_dir = args.output_dir
    output_dir.mkdir(parents=True, exist_ok=True)

    candidates, stats = collect_candidates(args.vqa_json, repo_root)
    rng = random.Random(args.seed)
    rng.shuffle(candidates)

    print(f"Read {stats['rows']} VQA rows")
    print(f"Resolved {len(candidates)} unique videos")
    print(f"Skipped {stats['unresolved']} unresolved rows and {stats['unknown_dataset']} unknown-dataset rows")

    encoder_args = choose_encoder()
    records: list[dict[str, object]] = []

    for candidate in candidates:
        if len(records) >= args.num_clips:
            break

        try:
            source_duration = ffprobe_duration(candidate.source_path)
        except Exception as exc:
            print(f"[SKIP] {candidate.video_name}: {exc}")
            continue

        if source_duration < args.min_duration:
            print(f"[SKIP] {candidate.video_name}: source too short ({source_duration:.2f}s)")
            continue

        clip_duration = min(args.clip_duration, source_duration)
        start = choose_start(candidate, source_duration, clip_duration, rng)
        index = len(records) + 1
        slug = safe_slug(candidate.video_name)
        clip_name = f"{index:02d}_{candidate.dataset}_{slug}_{start:.1f}s.mp4"
        clip_path = output_dir / clip_name

        record = {
            "clip_path": str(clip_path),
            "dataset": candidate.dataset,
            "video_name": candidate.video_name,
            "source_path": str(candidate.source_path),
            "start_sec": round(start, 3),
            "duration_sec": round(clip_duration, 3),
            "source_duration_sec": round(source_duration, 3),
            "row_count": candidate.row_count,
            "sample_image_path": sorted(candidate.image_paths)[0] if candidate.image_paths else "",
        }

        if args.dry_run:
            print(f"[DRY] {clip_path} <- {candidate.source_path} @ {start:.2f}s")
        else:
            print(f"[RUN] {clip_path.name} <- {candidate.dataset}/{candidate.video_name} @ {start:.2f}s")
            try:
                extract_clip(candidate, clip_path, start, clip_duration, args.max_width, encoder_args)
            except Exception as exc:
                print(f"[SKIP] {candidate.video_name}: {exc}")
                continue

        records.append(record)

    write_manifests(output_dir, records)
    print(f"Saved {len(records)} clip records to {output_dir / 'clips_manifest.jsonl'}")


if __name__ == "__main__":
    main()
