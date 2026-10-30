import { t, type Lang } from "@/lib/i18n";
import { site, zaloLink, whatsappLink, telHref, cdn } from "@/lib/site";

export function Footer({ lang }: { lang: Lang }) {
  const d = t(lang);
  const brand = lang === "zh" ? site.brandZh : site.brandVi;
  const contact = lang === "zh" ? site.contactZh : site.contactVi;
  const services = lang === "zh" ? site.servicesZh : site.servicesVi;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cdn("/images/logo.svg")} alt="" width={26} height={26} />
              <h4 style={{ margin: 0 }}>{brand}</h4>
            </div>
            <p>{lang === "zh" ? site.legalZh : site.legalVi}</p>
            <ul className="footer-services">
              {services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p style={{ color: "#9aa08f" }}>{d.footer.trustLine}</p>
          </div>
          <div>
            <h4>{d.footer.contact}</h4>
            <ul className="footer-contact">
              <li>
                👤 {contact}
              </li>
              <li>
                ☎{" "}
                <a href={telHref()} style={{ fontWeight: 700 }}>
                  {site.phone}
                </a>
              </li>
              <li>
                💬 <a href={zaloLink()}>Zalo</a> ·{" "}
                <a href={whatsappLink(d.cta.waText)}>WhatsApp</a>
              </li>
              <li>🟢 WeChat（微信）· {d.footer.scanQr}</li>
              <li>
                ✉️ <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                🌐{" "}
                <a href={site.url} hrefLang={lang}>
                  kehuangtrade.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4>{d.footer.qr}</h4>
            <div className="qr-row">
              <div className="qr-box">
                <a className="qr" href={zaloLink()} aria-label="Zalo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cdn("/images/qr-zalo.png")} alt="Zalo QR" width={74} height={74} />
                </a>
                Zalo
              </div>
              <div className="qr-box">
                <div className="qr">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cdn("/images/qr-wechat.png")} alt="WeChat QR" width={74} height={74} />
                </div>
                WeChat（微信）
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} {site.legalEn} · kehuangtrade.com
        </div>
      </div>
    </footer>
  );
}
