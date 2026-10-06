// 零依赖静态服务器：node scripts/serve.js （预览 out/ 目录）
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "out");
const types = {
  html: "text/html; charset=utf-8",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
  css: "text/css",
  js: "text/javascript",
  xml: "text/xml",
  txt: "text/plain",
  ico: "image/x-icon",
};

http
  .createServer((req, res) => {
    let p = path.join(root, decodeURIComponent(req.url.split("?")[0]));
    if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, "index.html");
    if (!fs.existsSync(p)) { res.statusCode = 404; p = path.join(root, "404.html"); }
    const ext = p.split(".").pop();
    res.setHeader("Content-Type", types[ext] || "application/octet-stream");
    fs.createReadStream(p).pipe(res);
  })
  .listen(4173, () => console.log("preview: http://localhost:4173/vi/  (zh: /zh/)"));
