/** @type {import('next').NextConfig} */
const nextConfig = {
  // 纯静态导出，部署 Cloudflare Pages
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
