/** 品类磁贴图标：优先用实拍图标（McMaster 裁帧/真产品图），缺省回退到线条 SVG */
const paths: Record<string, React.ReactNode> = {
  labor: (
    <>
      <path d="M3 16h18" />
      <path d="M5 16a7 7 0 0 1 14 0" />
      <path d="M12 6v3" />
    </>
  ),
  tools: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  ),
  electric: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
  equipment: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
    </>
  ),
  facility: (
    <>
      <path d="M3 7l9-4 9 4v10l-9 4-9-4z" />
      <path d="M3 7l9 4 9-4M12 11v10" />
    </>
  ),
  vehicle: (
    <>
      <path d="M1 6h12v10H1z" />
      <path d="M13 9h5l3 3v4h-8z" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </>
  ),
  fastener: (
    <>
      <path d="M12 2l8 5v10l-8 5-8-5V7z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
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
  chemical: <path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z" />,
  esd: (
    <>
      <rect x="7" y="7" width="10" height="10" />
      <path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3" />
    </>
  ),
  welding: <path d="M12 2c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 2-7 2 1 3 2 3 4z" />,
  autoparts: (
    <>
      <path d="M4 13l1.8-4.5A2 2 0 0 1 7.7 7h8.6a2 2 0 0 1 1.9 1.5L20 13" />
      <path d="M3 13h18v5H3z" />
      <circle cx="7.5" cy="18" r="1.6" />
      <circle cx="16.5" cy="18" r="1.6" />
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
  building: (
    <>
      <rect x="4" y="4" width="9" height="5" rx="1" />
      <path d="M8.5 9v2.5" />
      <circle cx="15" cy="15.5" r="4.2" />
      <path d="M8.5 12.5h2.4M20 6.5h.5" />
    </>
  ),
  workwear: (
    <>
      <path d="M8.5 3.5 12 5.5l3.5-2 4 3.5-2.5 2.5v10h-10v-10L4.5 7z" />
      <path d="M12 5.5V21" />
    </>
  ),
  office: (
    <>
      <rect x="6" y="4.5" width="12" height="16.5" rx="2" />
      <path d="M9.5 4.5a2.5 2.5 0 0 1 5 0" />
      <path d="M9.5 11h5M9.5 15h3.5" />
    </>
  ),
  evehicle: (
    <>
      <circle cx="5.5" cy="17" r="2.5" />
      <circle cx="18" cy="17" r="2.5" />
      <path d="M8 17h7.5" />
      <path d="M14.5 5H17l2 12" />
      <path d="M14.5 5l-3.5 8H8" />
      <path d="M5 6.5h4.5" />
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
        src={icon}
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
