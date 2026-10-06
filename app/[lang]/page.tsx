import Link from "next/link";
import type { Metadata } from "next";
import { categories, byCategory, name, type Lang } from "@/lib/data";
import { t, langs } from "@/lib/i18n";
import { zaloLink, whatsappLink, site, withBase } from "@/lib/site";
import { TrustBar } from "@/components/TrustBar";
import { InquiryBanner } from "@/components/InquiryBanner";
import { CategoryIcon } from "@/components/CategoryIcon";

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const d = t(params.lang as Lang);
  return { title: d.home.heroTitle, description: d.home.heroSub };
}

/** 首页动线（5模块）：Hero → 六大品类（找货第一）→ 精选商品 → 行业方案·真实交付 → 聊天兜底 */
export default function HomePage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang;
  const d = t(lang);

  return (
    <>
      {/* ① Hero：10秒说清“这是谁、能干什么、怎么询价” */}
      <section className="hero">
        <div className="hero-bg">
          <img src={withBase("/images/hero.jpg")} alt="" />
        </div>
        <div className="container">
          <div className="hero-inner">
            <h1>{d.home.heroTitle}</h1>
            <p className="sub">{d.home.heroSub}</p>
            <div className="hero-ctas">
              <a className="btn btn-cta" href={zaloLink()}>
                📷 {d.cta.inquiry24}
              </a>
              <a className="btn btn-white" href={whatsappLink(d.cta.waText)}>
                {d.cta.whatsapp}
              </a>
            </div>
            {/* RxOneShop 式首屏三步引导：告诉用户点了按钮之后会发生什么 */}
            <div className="hero-steps">
              {d.home.heroSteps.map((s, i) => (
                <span className="hero-step" key={s}>
                  <b>{i + 1}</b>
                  {s}
                </span>
              ))}
            </div>
            <p className="hero-phone">
              ☎ {site.phone} · Zalo / WhatsApp {lang === "zh" ? "同号" : "cùng số"}
            </p>
          </div>
        </div>
      </section>

      <TrustBar lang={lang} />

      {/* ② 产品品类 —— 按采购心智分组的磁贴网格（导航“产品”锚点至此） */}
      <section id="categories">
        <div className="container">
          <div className="section-head">
            <h2>{d.home.categoriesTitle}</h2>
            <p>{d.home.categoriesSub}</p>
          </div>
          {d.home.catGroups.map((g, gi) => {
            const cats = categories.filter((c) => c.group === g.key);
            const isLast = gi === d.home.catGroups.length - 1;
            return (
              <div key={g.key}>
                <h3 className="cat-group-label">{g.label}</h3>
                <div className="cat-grid">
                  {cats.map((c, ci) => {
                    const n = byCategory(c.slug).length;
                    const subs = ((lang === "zh" ? c.subs?.zh : c.subs?.vi) ?? "").split(" · ").filter(Boolean);
                    const codeMap: Record<string, string> = { mro: "MRO", equipment: "EQP", auto: "AUTO" };
                    const code = `${codeMap[g.key] ?? g.key.toUpperCase()}·${String(ci + 1).padStart(2, "0")}`;
                    const tileBody = (
                      <>
                        <span className="ct-top">
                          <i className="ct-code">{code}</i>
                          {n === 0 && <b className="ct-tag">{d.home.onDemand}</b>}
                        </span>
                        <span className="ct-icon">
                          <CategoryIcon slug={c.slug} icon={c.icon} size={52} />
                        </span>
                        <span className="ct-name">{name(lang, c)}</span>
                        <span className="ct-subs">
                          {subs.map((s) => (
                            <em key={s}>{s}</em>
                          ))}
                        </span>
                        <span className="ct-go">→</span>
                      </>
                    );
                    /* 代采品类：整块直连聊天；有货的进品类页 */
                    return n === 0 ? (
                      <a
                        key={c.slug}
                        className="ct"
                        style={{ animationDelay: `${Math.min(ci * 40, 240)}ms` }}
                        href={whatsappLink(
                          lang === "zh" ? `我想采购：${c.nameZh}` : `Tôi cần mua: ${c.nameVi}`
                        )}
                      >
                        {tileBody}
                      </a>
                    ) : (
                      <Link
                        key={c.slug}
                        href={`/${lang}/category/${c.slug}/`}
                        className="ct"
                        style={{ animationDelay: `${Math.min(ci * 40, 240)}ms` }}
                      >
                        {tileBody}
                      </Link>
                    );
                  })}
                  {isLast && (
                    <a href={zaloLink()} className="ct ct-more">
                      <span className="ct-top">
                        <i className="ct-code">ALL·99</i>
                      </span>
                      <span className="ct-icon">
                        <CategoryIcon slug="__more" size={52} />
                      </span>
                      <span className="ct-name">{d.home.moreCats}</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ③ 找到你的行业（FluxWise 式痛点问句钩子 + 方案 + 真实交付徽章） */}
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <h2>{d.home.industryTitle}</h2>
            <p>{d.home.solutionsSub}</p>
          </div>
          <div className="grid-cards scene-grid">
            {d.home.scenes.map((s) => (
              <Link key={s.slug} href={`/${lang}/solutions/${s.slug}/`} className="card card-link scene-card">
                <div className="card-pad">
                  <h3>{s.name}</h3>
                  <p className="scene-q">
                    {s.q1}
                    <br />
                    {s.q2}
                  </p>
                  <p className="scene-sol">{s.sol}</p>
                  <span className="badge badge-cta">✓ {s.caseNote}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ④ 怎么合作（RxOneShop 式 How It Works，三步紧凑版） */}
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="prose-block" style={{ margin: 0 }}>
            <h2>{d.home.howTitle}</h2>
            <div className="steps" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              {d.home.howSteps.map((s) => (
                <div className="step" key={s}>
                  <div>{s}</div>
                </div>
              ))}
            </div>
            <p className="form-note" style={{ marginTop: 10 }}>{d.home.howNote}</p>
          </div>
        </div>
      </section>

      {/* ⑤ 底部转化兜底：没找到想要的 → 直连聊天 */}
      <div className="container">
        <InquiryBanner lang={lang} />
      </div>
    </>
  );
}
