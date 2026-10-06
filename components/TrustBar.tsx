import { t, type Lang } from "@/lib/i18n";

const Icon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

/** 信任条：首页可见的四个信任要素（验收清单要求） */
export function TrustBar({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <div className="trustbar">
      <div className="container">
        {d.home.trust.map((item) => (
          <div className="trust-item" key={item}>
            <Icon />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
