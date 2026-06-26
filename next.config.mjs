/** @type {import('next').NextConfig} */
const [owner = "", repoName = ""] = process.env.GITHUB_REPOSITORY?.split("/") ?? [];
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const isUserOrOrgPages = repoName === `${owner}.github.io`;
const githubPagesBasePath =
  isGitHubActions && repoName && !isUserOrOrgPages ? `/${repoName}` : "";

const nextConfig = {
  output: "export",
  devIndicators: false,
  reactStrictMode: true,
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? githubPagesBasePath,
};

export default nextConfig;
