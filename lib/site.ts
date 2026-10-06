// 站点全局配置 —— 上线前把所有占位值替换为真实信息（仅改这一个文件）
export const site = {
  url: "https://kehuangtrade.com",
  brandZh: "柯煌 Kehuang",
  brandVi: "Kha Hoàng",
  legalZh: "广西柯煌进出口贸易有限公司",
  legalVi: "Công ty TNHH Thương mại Xuất nhập khẩu Kha Hoàng Quảng Tây",
  // 主口号（竞品同款语言：正牌 + 直进口不转手）
  sloganZh: "正牌工业品，中国直接进口，不经第三方",
  sloganVi: "Vật tư công nghiệp chính hãng — nhập trực tiếp từ Trung Quốc, không qua bên thứ ba",
  // 一号三用：Zalo / 热线 / WhatsApp 共用号码（启发7）
  phone: "09xx xxx xxx",
  phoneIntl: "8490xxxxxxx",
  zalo: "09xx xxx xxx",
  wechatId: "WeChatID-001",
  email: "sales@kehuangtrade.com",
} as const;

export const zaloLink = () => `https://zalo.me/${site.zalo.replace(/\s/g, "")}`;
// WhatsApp 支持预填文案，转化直连时带上开场白
export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.phoneIntl}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

// 子路径部署前缀（GitHub Pages 仓库名 = /kehuangtrade；根域名部署时为空，不影响 Cloudflare Pages）
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const withBase = (p: string) => `${basePath}${p}`;
