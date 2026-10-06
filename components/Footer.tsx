import { t, type Lang } from "@/lib/i18n";
import { site, zaloLink, whatsappLink } from "@/lib/site";

export function Footer({ lang }: { lang: Lang }) {
  const d = t(lang);
  const brand = lang === "zh" ? site.brandZh : site.brandVi;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.svg" alt="" width={26} height={26} />
              <h4 style={{ margin: 0 }}>{brand}</h4>
            </div>
            <p>{d.home.heroTitle}</p>
            <p style={{ color: "#9aa08f" }}>{d.footer.trustLine}</p>
          </div>
          <div>
            <h4>{d.footer.contact}</h4>
            <ul className="footer-contact">
              <li>
                ☎{" "}
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} style={{ fontWeight: 700 }}>
                  {site.phone}
                </a>
              </li>
              <li>
                💬 <a href={zaloLink()}>Zalo</a> ·{" "}
                <a href={whatsappLink(d.cta.waText)}>WhatsApp</a>
              </li>
              <li>
                🟢 WeChat: <span style={{ fontWeight: 700 }}>{site.wechatId}</span>
              </li>
              <li>
                ✉️ <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>{d.footer.qr}</h4>
            <div className="qr-row">
              <div className="qr-box">
                <div className="qr">QR<br />Zalo</div>
                Zalo
              </div>
              <div className="qr-box">
                <div className="qr">QR<br />WeChat</div>
                WeChat
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} {lang === "zh" ? site.legalZh : site.legalVi} · kehuangtrade.com
        </div>
      </div>
    </footer>
  );
}
