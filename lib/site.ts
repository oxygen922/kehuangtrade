// 站点全局配置 —— 上线前把所有占位值替换为真实信息（仅改这一个文件）
export const site = {
  url: "https://kehuangtrade.com",
  brandZh: "柯煌 Kehuang",
  brandVi: "Kha Hoàng",
  legalZh: "广西柯煌进出口贸易有限公司",
  legalVi: "Công ty TNHH Thương mại Xuất nhập khẩu Kha Hoàng Quảng Tây",
  legalEn: "Guangxi Kehuang Import and Export Trading Co., LTD",
  // 主口号（竞品同款语言：正牌 + 直进口不转手）
  sloganZh: "正牌工业品，中国直接进口，不经第三方",
  sloganVi: "Vật tư công nghiệp chính hãng — nhập trực tiếp từ Trung Quốc, không qua bên thứ ba",
  // 联系人
  contactZh: "阮海兰",
  contactVi: "Nguyễn Hải Lan",
  // 一号三用：热线 / Zalo / WhatsApp 共用号码（启发7）
  phone: "+86 135-1771-3937",
  phoneIntl: "8613517713937",
  zalo: "+86 135-1771-3937",
  email: "sales@kehuangtrade.com",
  // 主营业务
  servicesZh: [
    "中国采购代理 · 代寻源验货发货",
    "中越进出口贸易 · 报关物流结算",
    "中越商务考察 · 行程随行翻译",
  ],
  servicesVi: [
    "Đại lý thu mua Trung Quốc · tìm nguồn, kiểm hàng, giao hàng",
    "Thương mại XNK Trung – Việt · thông quan, logistics, thanh toán",
    "Khảo sát thương mại Trung – Việt · lịch trình, phiên dịch đi cùng",
  ],
} as const;

// 电话/Zalo 号码归一化：去掉空格与短横线，保留国码加号
const dialable = (n: string) => n.replace(/[^\d+]/g, "");
export const telHref = () => `tel:${dialable(site.phone)}`;
export const zaloLink = () => `https://zalo.me/${dialable(site.zalo)}`;
// WhatsApp 支持预填文案，转化直连时带上开场白
export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.phoneIntl}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

// 子路径部署前缀（GitHub Pages 仓库名 = /kehuangtrade；根域名部署时为空，不影响 Cloudflare Pages）
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const withBase = (p: string) => `${basePath}${p}`;

// R2 图片外链（NEXT_PUBLIC_IMG_BASE 设为桶公开地址如 https://pub-xxx.r2.dev 时启用；
// 桶内对象键不带 /images 前缀，因此映射时剥掉；未设置时回落本地 /images）
export const imgBase = process.env.NEXT_PUBLIC_IMG_BASE ?? "";
export const cdn = (p: string) =>
  imgBase ? `${imgBase}${p.replace(/^\/images/, "")}` : withBase(p);
