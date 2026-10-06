// 静态导出后补一个根路径跳转页（Cloudflare 上由 _redirects 302 兜底，本地预览走这里）
// GitHub Pages 子路径部署时通过 NEXT_PUBLIC_BASE_PATH 自动适配（如 /kehuangtrade）
const fs = require("fs");

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const html = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="refresh" content="0;url=${base}/vi/">
<title>Vat tu cong nghiep | 工业品供应</title>
</head>
<body>
<p>Tieng Viet: <a href="${base}/vi/">vao website</a> · 中文：<a href="${base}/zh/">进入网站</a></p>
</body>
</html>`;

fs.writeFileSync("out/index.html", html);
console.log(`root redirect written: out/index.html -> ${base}/vi/`);

// 子路径部署时同步改写 404 页里的站内链接
if (base) {
  const f404 = "out/404.html";
  if (fs.existsSync(f404)) {
    fs.writeFileSync(f404, fs.readFileSync(f404, "utf8").replace(/href="\/(vi|zh)\//g, `href="${base}/$1/`));
    console.log(`404.html rewritten with base ${base}`);
  }
}
