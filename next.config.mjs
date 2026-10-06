/** @type {import('next').NextConfig} */
const nextConfig = {
  // 纯静态导出，部署 Cloudflare Pages；GitHub Pages 子路径部署时通过 NEXT_PUBLIC_BASE_PATH 启用前缀
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
};

export default nextConfig;
