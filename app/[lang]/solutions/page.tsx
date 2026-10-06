import Link from "next/link";
import type { Metadata } from "next";
import { solutions, type Lang } from "@/lib/data";
import { t, langs } from "@/lib/i18n";
import { withBase, cdn } from "@/lib/site";

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const d = t(params.lang as Lang);
  return { title: d.nav.solutions, description: d.home.solutionsSub };
}

export default function SolutionsPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang;
  const d = t(lang);
  return (
    <div className="container">
      <div className="crumbs">
        <a href={withBase(`/${lang}/`)}>{d.breadcrumb.home}</a> / {d.nav.solutions}
      </div>
      <div className="page-head">
        <h1>{d.nav.solutions}</h1>
        <p className="lead">{d.home.solutionsSub}</p>
      </div>
      <div className="grid-cards">
        {solutions.map((s) => (
          <Link key={s.slug} href={`/${lang}/solutions/${s.slug}/`} className="card card-link">
            <div className="card-img">
              <img src={cdn(`/images/solutions/${s.slug}.jpg`)} alt={lang === "zh" ? s.titleZh : s.titleVi} loading="lazy" width={400} height={300} />
            </div>
            <div className="card-pad">
              <h3>{lang === "zh" ? s.titleZh : s.titleVi}</h3>
              <p>
                {s.items.length} {lang === "zh" ? "项需求组合" : "nhóm nhu cầu"}
              </p>
              <span className={`badge ${s.status === "live" ? "" : "badge-soon"}`} style={{ marginTop: 8, display: "inline-block" }}>
                {s.status === "live" ? (lang === "zh" ? "查看方案" : "Xem ngay") : d.home.soon}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
