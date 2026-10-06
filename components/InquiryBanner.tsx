import Link from "next/link";
import { t, type Lang } from "@/lib/i18n";
import { zaloLink, whatsappLink } from "@/lib/site";

/** “没找到想要的？”转化兜底横幅（方案 4.2：品类页中部+底部各一次）—— 直连聊天，不走表单 */
export function InquiryBanner({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <div className="inquiry-banner">
      <div>
        <h3>{d.home.ctaTitle}</h3>
        <p>{d.home.ctaSub}</p>
      </div>
      <div className="btns">
        <a className="btn btn-cta" href={zaloLink()}>
          {d.cta.zaloNow}
        </a>
        <a className="btn btn-white" href={whatsappLink(d.cta.waText)}>
          {d.cta.whatsapp}
        </a>
      </div>
    </div>
  );
}
