// 静态导出后补一个根路径跳转页（Cloudflare 上由 _redirects 302 兜底，本地预览走这里）
const fs = require("fs");

const html = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="refresh" content="0;url=/vi/">
<title>Vat tu cong nghiep | 工业品供应</title>
</head>
<body>
<p>Tieng Viet: <a href="/vi/">vao website</a> · 中文：<a href="/zh/">进入网站</a></p>
</body>
</html>`;

fs.writeFileSync("out/index.html", html);
console.log("root redirect written: out/index.html");
