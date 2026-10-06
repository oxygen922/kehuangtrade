import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { t, langs, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = params.lang as Lang;
  const d = t(lang);
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${lang === "zh" ? site.brandZh : site.brandVi} — ${d.home.heroTitle}`,
      template: `%s | ${lang === "zh" ? site.brandZh : site.brandVi}`,
    },
    description: d.home.heroSub,
    alternates: {
      languages: { vi: "/vi/", zh: "/zh/" },
    },
  };
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = params.lang as Lang;
  if (!langs.includes(lang)) notFound();
  return (
    <html lang={lang}>
      <body>
        <Header lang={lang} />
        <main>{children}</main>
        <Footer lang={lang} />
        <FloatingCTA lang={lang} />
      </body>
    </html>
  );
}
