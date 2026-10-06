import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { solutions, getSolution, casesByIds, name, desc, type Lang } from "@/lib/data";
import { t, langs } from "@/lib/i18n";
import { withBase, cdn } from "@/lib/site";
import { InquiryBanner } from "@/components/InquiryBanner";

export const dynamicParams = false;

export function generateStaticParams() {
  return langs.flatMap((lang) => solutions.map((s) => ({ lang, slug: s.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const lang = params.lang as Lang;
  const s = getSolution(params.slug);
  if (!s) return {};
  const title = lang === "zh" ? s.titleZh : s.titleVi;
  return {
    title,
    description: (lang === "zh" ? s.painZh : s.painVi).slice(0, 100),
    alternates: {
      canonical: withBase(`/${lang}/solutions/${s.slug}/`),
      languages: {
        vi: withBase(`/vi/solutions/${s.slug}/`),
        zh: withBase(`/zh/solutions/${s.slug}/`),
      },
    },
  };
}

/**
 * 场景页 = 一篇给工厂负责人读的“行业文章”（移动优先阅读流）：
 * 标题 → 痛点引子 → 常采清单（纯信息，不跳转）→ 真实案例 → 聊天转化
 */
export default function SolutionPage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const lang = params.lang as Lang;
  const d = t(lang);
  const s = getSolution(params.slug);
  if (!s) notFound();
  const sc = casesByIds(s.caseIds);
  const isZh = lang === "zh";

  return (
    <div className="container">
      <div className="crumbs">
        <a href={withBase(`/${lang}/`)}>{d.breadcrumb.home}</a> / <a href={withBase(`/${lang}/solutions/`)}>{d.nav.solutions}</a> /{" "}
        {isZh ? s.titleZh : s.titleVi}
      </div>

      <header className="page-head">
        <h1>{isZh ? s.titleZh : s.titleVi}</h1>
      </header>

      {/* 痛点引子：先说痛，再给药 */}
      <p className="sol-pain">{isZh ? s.painZh : s.painVi}</p>

      {/* 常采清单：纯信息列表，客户不需要跳去具体产品 */}
      <section className="sol-section">
        <h2 className="sol-h">{isZh ? "这个行业我们常采" : "Danh mục thường mua cho ngành này"}</h2>
        <ul className="sol-list">
          {s.items.map((it, i) => (
            <li key={i}>
              <span className="sol-check" aria-hidden>✓</span>
              <span>{isZh ? it.nameZh : it.nameVi}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 真实案例：移动端单列大卡，桌面双列 */}
      {sc.length > 0 && (
        <section className="sol-section">
          <h2 className="sol-h">{d.category.relatedCases}</h2>
          <div className="sol-cases">
            {sc.map((c) => (
              <article className="case-card" key={c.id}>
                <div className="case-card-img">
                  <img
                    src={cdn(c.images[0])}
                    alt={name(lang, c)}
                    loading="lazy"
                    width={640}
                    height={360}
                  />
                </div>
                <div className="case-card-body">
                  <h3>{name(lang, c)}</h3>
                  {(isZh ? c.profileZh : c.profileVi) && (
                    <p className="case-profile">{isZh ? c.profileZh : c.profileVi}</p>
                  )}
                  <p>{desc(lang, c)}</p>
                  {c.metrics && (
                    <div className="case-metrics">
                      {(isZh ? c.metrics.zh : c.metrics.vi).map(([k, v]) => (
                        <div className="cm" key={k}>
                          <span className="cm-k">{k}</span>
                          <span className="cm-v">{v}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <InquiryBanner lang={lang} />
    </div>
  );
}
