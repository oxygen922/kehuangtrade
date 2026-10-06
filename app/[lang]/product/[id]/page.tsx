import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products, getProduct, relatedProducts, getCategory, name, type Lang } from "@/lib/data";
import { t, langs } from "@/lib/i18n";
import { zaloLink, whatsappLink, site, withBase, cdn } from "@/lib/site";
import { ProductCard } from "@/components/ProductCard";
import { InquiryBanner } from "@/components/InquiryBanner";

export const dynamicParams = false;

export function generateStaticParams() {
  return langs.flatMap((lang) => products.map((p) => ({ lang, id: p.id })));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; id: string };
}): Promise<Metadata> {
  const lang = params.lang as Lang;
  const p = getProduct(params.id);
  if (!p) return {};
  return {
    title: name(lang, p),
    description: (lang === "zh" ? p.introZh : p.introVi) || name(lang, p),
    alternates: {
      canonical: withBase(`/${lang}/product/${p.id}/`),
      languages: {
        vi: withBase(`/vi/product/${p.id}/`),
        zh: withBase(`/zh/product/${p.id}/`),
      },
    },
  };
}

export default function ProductPage({ params }: { params: { lang: string; id: string } }) {
  const lang = params.lang as Lang;
  const d = t(lang);
  const p = getProduct(params.id);
  if (!p) notFound();
  const cat = getCategory(p.category);
  const intro = lang === "zh" ? p.introZh : p.introVi;
  const waText =
    lang === "zh" ? `询价：${p.nameZh}（${p.id}）` : `Hỏi giá: ${p.nameVi} (${p.id})`;

  // Product 结构化数据（不带价格与可得性，守住 V1 红线）
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: name(lang, p),
    image: p.images.map((i) => `${site.url}${i}`),
    description: intro || name(lang, p),
    sku: p.id,
    brand: p.brand ? { "@type": "Brand", name: p.brand } : undefined,
  };

  return (
    <div className="container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="crumbs">
        <a href={withBase(`/${lang}/`)}>{d.breadcrumb.home}</a> /{" "}
        {cat && (
          <>
            <a href={withBase(`/${lang}/category/${cat.slug}/`)}>{name(lang, cat)}</a> /{" "}
          </>
        )}
        {name(lang, p)}
      </div>

      <div className="product-layout" style={{ marginTop: 12 }}>
        <div className="detail-img">
          <img src={cdn(p.images[0])} alt={name(lang, p)} width={600} height={600} />
        </div>

        <div className="detail-info">
          <h1>{name(lang, p)}</h1>
          <div className="meta-chips">
            {p.brand && <span className="badge">Brand: {p.brand}</span>}
            {p.model && <span className="badge">Model: {p.model}</span>}
            <span className="badge badge-cta">{lang === "zh" ? "询价获取价格" : "Liên hệ để lấy giá"}</span>
          </div>

          <h2 style={{ fontSize: "1rem", marginTop: 14 }}>{d.product.paramsTitle}</h2>
          <table className="params">
            <tbody>
              {p.params.map((row, i) => (
                <tr key={i}>
                  <th>{lang === "zh" ? row.kZh : row.kVi}</th>
                  <td>{lang === "zh" ? row.vZh : row.vVi}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 style={{ fontSize: "1rem" }}>{d.product.trustTitle}</h2>
          <ul className="trust-list">
            {d.product.trustItems.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>

          <div className="detail-ctas">
            <a className="btn btn-primary btn-block" href={zaloLink()}>
              {d.cta.zaloNow}
            </a>
            <a className="btn btn-outline btn-block" href={whatsappLink(waText)}>
              {d.cta.whatsapp} · {d.product.askAbout}
            </a>
          </div>
        </div>
      </div>

      {/* “X là gì？”科普段（启发4：越南语SEO长尾打法） */}
      {intro && (
        <div className="prose-block">
          <h2>{d.product.introTitle}</h2>
          <p>{intro}</p>
        </div>
      )}

      {p.faq && p.faq.length > 0 && (
        <div className="faq">
          <div className="section-head">
            <h2>{d.product.faqTitle}</h2>
          </div>
          {p.faq.map((f, i) => (
            <details key={i} open={i === 0}>
              <summary>{lang === "zh" ? f.qZh : f.qVi}</summary>
              <p>{lang === "zh" ? f.aZh : f.aVi}</p>
            </details>
          ))}
        </div>
      )}

      <section>
        <div className="section-head">
          <h2>{d.product.relatedTitle}</h2>
        </div>
        <div className="grid-cards grid-products">
          {relatedProducts(p).map((rp) => (
            <ProductCard key={rp.id} lang={lang} product={rp} />
          ))}
        </div>
      </section>

      <InquiryBanner lang={lang} />
    </div>
  );
}
