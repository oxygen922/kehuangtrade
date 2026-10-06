"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { t, type Lang } from "@/lib/i18n";
import { site, cdn } from "@/lib/site";

export function Header({ lang }: { lang: Lang }) {
  const d = t(lang);
  const pathname = usePathname() || `/${lang}/`;
  const otherLang: Lang = lang === "zh" ? "vi" : "zh";
  const otherPath = pathname.replace(/^\/(vi|zh)(?=\/|$)/, `/${otherLang}`);
  const brand = lang === "zh" ? site.brandZh : site.brandVi;

  const navItems = [
    { href: `/${lang}/#categories`, label: d.nav.products, match: "\u0000none" },
    { href: `/${lang}/solutions/`, label: d.nav.solutions, match: "/solutions" },
    { href: `/${lang}/about/`, label: d.nav.about, match: "/about" },
  ];

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-top">
          <Link href={`/${lang}/`} className="brand" hrefLang={lang}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cdn("/images/logo.svg")} alt="" width={30} height={30} />
            {brand}
          </Link>
          <div className="header-actions">
            <a className="hotline hotline-inline" href={`tel:${site.phone.replace(/\s/g, "")}`}>
              ☎ {site.phone}
            </a>
            <Link className="lang-switch" href={otherPath} hrefLang={otherLang}>
              {d.langSwitch}
            </Link>
          </div>
        </div>
        <nav className="main-nav" aria-label="main">
          {navItems.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={pathname.includes(n.match) ? "active" : ""}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
