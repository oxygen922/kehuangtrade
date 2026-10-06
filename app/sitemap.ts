import type { MetadataRoute } from "next";
import { categories, products, solutions } from "@/lib/data";
import { langs } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths: string[] = [
    "",
    "solutions/",
    "about/",
    ...categories.map((c) => `category/${c.slug}/`),
    ...solutions.map((s) => `solutions/${s.slug}/`),
    ...products.map((p) => `product/${p.id}/`),
  ];
  return langs.flatMap((lang) =>
    paths.map((p) => ({
      url: `${site.url}/${lang}/${p}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.7,
    }))
  );
}
