/** 品类磁贴图标：优先用实拍图标（McMaster 裁帧/真产品图），缺省回退到线条 SVG */
import { cdn } from "@/lib/site";

const paths: Record<string, React.ReactNode> = {
  // 五大支柱中未配实拍图标的品类 → 线条 SVG 兜底
  plastics: (
    <>
      <circle cx="6.5" cy="17" r="2.4" />
      <circle cx="12" cy="17" r="2.4" />
      <circle cx="17.5" cy="17" r="2.4" />
      <circle cx="12" cy="10.8" r="2.4" />
      <circle cx="12" cy="5.2" r="1.6" />
    </>
  ),
  "chem-raw": <path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z" />,
  coatings: (
    <>
      <rect x="3.5" y="4.5" width="12" height="5" rx="1" />
      <path d="M15.5 7H20v3.5h-8" />
      <path d="M12 10.5V14" />
      <rect x="10" y="14" width="4" height="5.5" rx="1" />
    </>
  ),
  "metal-sheets": (
    <>
      <path d="M4 8l8-4 8 4-8 4z" />
      <path d="M4 12l8 4 8-4" />
      <path d="M4 16l8 4 8-4" />
    </>
  ),
  gypsum: (
    <>
      <rect x="5" y="4" width="14" height="16" rx="1" />
      <path d="M5 9.3h14M5 14.6h14M12 4v5.3M8.5 9.3v5.3M15.5 9.3v5.3M12 14.6V20" />
    </>
  ),
  formwork: (
    <>
      <rect x="4" y="5" width="16" height="6" rx="1" />
      <rect x="4" y="13" width="16" height="6" rx="1" />
      <path d="M9.5 5v6M14.5 13v6" />
    </>
  ),
  screws: (
    <>
      <path d="M8 4h8l1.5 3.5H6.5z" />
      <path d="M12 7.5V21" />
      <path d="M9.5 10.5h5M9.5 13.5h5M9.5 16.5h5" />
    </>
  ),
  anchors: (
    <>
      <circle cx="12" cy="6" r="2.5" />
      <path d="M12 8.5V13" />
      <path d="M8 13h8" />
      <path d="M8 13l4 8 4-8" />
    </>
  ),
  rivets: (
    <>
      <circle cx="10" cy="12" r="4" />
      <path d="M14 12h7" />
      <path d="M17 9.5v5" />
    </>
  ),
  "thread-rods": (
    <>
      <path d="M3 12h18" />
      <path d="M7 9.5l-2 2.5 2 2.5M11 9.5l-2 2.5 2 2.5M15 9.5l-2 2.5 2 2.5M19 9.5l-2 2.5 2 2.5" />
    </>
  ),
  // 以下 slug 沿用原有线条图标（部分品类另有实拍图标，优先生效）
  mold: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
    </>
  ),
  hydraul: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 12l4-4" />
      <path d="M12 21v-3" />
    </>
  ),
  esd: (
    <>
      <rect x="7" y="7" width="10" height="10" />
      <path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3" />
    </>
  ),
  welding: <path d="M12 2c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 2-7 2 1 3 2 3 4z" />,
  vehicle: (
    <>
      <path d="M1 6h12v10H1z" />
      <path d="M13 9h5l3 3v4h-8z" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </>
  ),
  agri: (
    <>
      <circle cx="6.5" cy="16.5" r="3" />
      <circle cx="17" cy="17.5" r="2.2" />
      <path d="M4 13h6l1.5-6h3.5l1 5.5" />
      <path d="M10.5 7V5h-2" />
    </>
  ),
  __more: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
};

export function CategoryIcon({
  slug,
  icon,
  size = 26,
}: {
  slug: string;
  icon?: string;
  size?: number;
}) {
  if (icon) {
    return (
      <img
        src={cdn(icon)}
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: "contain", borderRadius: 6 }}
      />
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[slug] ?? paths.__more}
    </svg>
  );
}
