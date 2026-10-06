import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, byCategory, getCategory, name, desc, type Lang } from "@/lib/data";
import { t, langs } from "@/lib/i18n";
import { ProductCard } from "@/components/ProductCard";
import { InquiryBanner } from "@/components/InquiryBanner";

export const dynamicParams = false;

export function generateStaticParams() {
  return langs.flatMap((lang) => categories.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const lang = params.lang as Lang;
  const c = getCategory(params.slug);
  if (!c) return {};
  return {
    title: name(lang, c),
    description: desc(lang, c),
    alternates: {
      canonical: `/${lang}/category/${c.slug}/`,
      languages: { vi: `/vi/category/${c.slug}/`, zh: `/zh/category/${c.slug}/` },
    },
  };
}

export default function CategoryPage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const lang = params.lang as Lang;
  const d = t(lang);
  const c = getCategory(params.slug);
  if (!c) notFound();
  const items = byCategory(c.slug);

  return (
    <div className="container">
      <div className="crumbs">
        <a href={`/${lang}/`}>{d.breadcrumb.home}</a> / {name(lang, c)}
      </div>
      <div className="page-head">
        <h1>{name(lang, c)}</h1>
        <p className="lead">
          {desc(lang, c)}
          {items.length > 0 && ` · ${items.length} ${d.category.itemsUnit}`}
        </p>
        {c.subs && (
          <div className="chip-row" style={{ marginTop: 10 }}>
            {(lang === "zh" ? c.subs.zh : c.subs.vi).split(" · ").map((s) => (
              <span className="chip" key={s}>{s}</span>
            ))}
          </div>
        )}
      </div>

      {items.length === 0 ? (
        /* 代采品类：目录未上架不装死，直接引导聊天 */
        <div className="prose-block" style={{ textAlign: "center" }}>
          <h2>{d.category.emptyTitle}</h2>
          <p style={{ color: "var(--muted)" }}>{d.category.emptySub}</p>
        </div>
      ) : (
        <div className="grid-cards grid-products">
          {items.map((p) => (
            <ProductCard key={p.id} lang={lang} product={p} />
          ))}
        </div>
      )}

      {/* 底部转化兜底：没找到想要的 → 直连聊天 */}
      <InquiryBanner lang={lang} />
    </div>
  );
}
