import Link from "next/link";
import { name, type Lang, type Product } from "@/lib/data";
import { whatsappLink, withBase } from "@/lib/site";

/** 商品卡：正文点击进详情；角标“询价”一步直达 WhatsApp（预填商品名） */
export function ProductCard({ lang, product }: { lang: Lang; product: Product }) {
  const param = product.params[0];
  const wa = whatsappLink(
    lang === "zh"
      ? `询价：${product.nameZh}（${product.id}）`
      : `Hỏi giá: ${product.nameVi} (${product.id})`
  );
  return (
    <div className="card product-card">
      <Link href={`/${lang}/product/${product.id}/`} className="product-card-main">
        <div className="card-img contain">
          <img src={withBase(product.images[0])} alt={name(lang, product)} loading="lazy" width={400} height={300} />
        </div>
        <div className="card-pad">
          <div className="pname">{name(lang, product)}</div>
          {param && (
            <div className="pparam">
              {lang === "zh" ? `${param.kZh}: ${param.vZh}` : `${param.kVi}: ${param.vVi}`}
            </div>
          )}
        </div>
      </Link>
      <a className="price-chip price-chip-float" href={wa}>
        {lang === "zh" ? "询价" : "Liên hệ"}
      </a>
    </div>
  );
}
