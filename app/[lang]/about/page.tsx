import type { Metadata } from "next";
import { t, langs, type Lang } from "@/lib/i18n";
import { site, zaloLink, whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const d = t(params.lang as Lang);
  return { title: d.about.title, description: d.about.whoBody };
}

export default function AboutPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang;
  const d = t(lang);
  return (
    <div className="container">
      <div className="crumbs">
        <a href={`/${lang}/`}>{d.breadcrumb.home}</a> / {d.about.title}
      </div>
      <div className="page-head">
        <h1>{d.about.title}</h1>
      </div>

      {/* 我们是谁 */}
      <div className="prose-block">
        <h2>{d.about.whoTitle}</h2>
        <p>{d.about.whoBody}</p>
      </div>

      {/* 团队与资源：让工厂负责人看到"联系我能拿到什么" */}
      <div className="prose-block">
        <h2>{d.about.teamTitle}</h2>
        <ul className="trust-list">
          {d.about.teamItems.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>

      {/* 数字墙（Panindochina 式"Why Choose Us"，我们的版本） */}
      <div className="prose-block">
        <h2>{d.about.statsTitle}</h2>
        <div className="stat-wall">
          {d.about.stats.map((s) => (
            <div className="stat" key={s.n + s.l}>
              <div className="stat-n">{s.n}</div>
              <div className="stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 常采品牌墙（文字 chips，诚实标注非授权关系） */}
      <div className="prose-block">
        <h2>{d.about.brandsTitle}</h2>
        <div className="chip-row">
          {d.about.brands.map((b) => (
            <span className="chip" key={b}>{b}</span>
          ))}
        </div>
      </div>

      {/* 已交付行业 */}
      <div className="prose-block">
        <h2>{d.about.industriesTitle}</h2>
        <div className="chip-row">
          {d.about.industries.map((b) => (
            <span className="chip chip-green" key={b}>{b}</span>
          ))}
        </div>
      </div>

      {/* 增值服务（学 Panindochina 的"服务>卖货"） */}
      <div className="prose-block">
        <h2>{d.about.servicesTitle}</h2>
        <ul className="trust-list">
          {d.about.services.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>

      {/* 服务承诺 */}
      <div className="prose-block">
        <h2>{d.about.promiseTitle}</h2>
        <ul className="trust-list">
          {d.about.promises.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>

      {/* 合作流程（6步图形化） */}
      <div className="prose-block">
        <h2>{d.about.processTitle}</h2>
        <div className="steps">
          {d.about.steps.map((s) => (
            <div className="step" key={s}>
              <div>{s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 单证墙（样张 + 逐张说明：正贸三件套对买家的实际价值） */}
      <div className="prose-block">
        <h2>{d.about.docTitle}</h2>
        <div className="doc-wall">
          {d.about.docs.map((doc) => (
            <div className="doc-card" key={doc.name}>
              <div className="doc-card-img">
                <img src={doc.img} alt={doc.name} loading="lazy" width={400} height={300} />
              </div>
              <div className="doc-card-body">
                <h3>{doc.name}</h3>
                <p>{doc.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="form-note" style={{ marginTop: 10 }}>{d.about.docNote}</p>
      </div>

      {/* 联系方式 */}
      <div className="prose-block">
        <h2>{d.about.contactTitle}</h2>
        <ul className="trust-list">
          <li>Zalo: {site.zalo}</li>
          <li>Hotline: {site.phone}</li>
          <li>WeChat: {site.wechatId}</li>
          <li>Email: {site.email}</li>
        </ul>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
          <a className="btn btn-primary" href={zaloLink()}>
            {d.cta.zaloNow}
          </a>
          <a className="btn btn-outline" href={whatsappLink(d.cta.waText)}>
            {d.cta.whatsapp}
          </a>
        </div>
      </div>
    </div>
  );
}
