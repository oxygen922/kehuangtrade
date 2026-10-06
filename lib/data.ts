import productsJson from "@/data/products.json";
import categoriesJson from "@/data/categories.json";
import casesJson from "@/data/cases.json";
import solutionsJson from "@/data/solutions.json";
import type { Lang } from "./i18n";

export type { Lang };

export interface Param {
  kZh: string; kVi: string; vZh: string; vVi: string;
}
export interface Faq {
  qZh: string; qVi: string; aZh: string; aVi: string;
}
export interface Product {
  id: string;
  category: string;
  nameZh: string;
  nameVi: string;
  brand?: string;
  model?: string;
  images: string[];
  params: Param[];
  introZh?: string;
  introVi?: string;
  faq?: Faq[];
  featured?: boolean;
  scenario?: string[];
  updatedAt: string;
}
export interface Category {
  slug: string; group?: string; nameZh: string; nameVi: string; descZh: string; descVi: string;
  subs?: { zh: string; vi: string };
  hero?: string; icon?: string;
}
export interface CaseItem {
  id: string; titleZh: string; titleVi: string; descZh: string; descVi: string;
  profileZh?: string; profileVi?: string;
  metrics?: { zh: [string, string][]; vi: [string, string][] };
  images: string[]; date: string; scenario: string[];
}
export interface SolutionItem {
  nameZh: string; nameVi: string; categorySlug?: string;
}
export interface Solution {
  slug: string; status: "live" | "soon";
  titleZh: string; titleVi: string;
  painZh: string; painVi: string;
  items: SolutionItem[];
  caseIds: string[];
}

export const products = productsJson as Product[];
export const categories = categoriesJson as Category[];
export const cases = casesJson as CaseItem[];
export const solutions = solutionsJson as Solution[];

export const name = (
  lang: Lang,
  p: { nameZh?: string; nameVi?: string; titleZh?: string; titleVi?: string }
) => (lang === "zh" ? p.nameZh ?? p.titleZh : p.nameVi ?? p.titleVi) as string;
export const desc = (lang: Lang, p: { descZh: string; descVi: string }) =>
  lang === "zh" ? p.descZh : p.descVi;

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const byCategory = (slug: string) => products.filter((p) => p.category === slug);
export const featured = () => products.filter((p) => p.featured);
export const relatedProducts = (p: Product, n = 4) =>
  products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, n);
export const casesFor = (scenario?: string, categorySlug?: string, n = 2) =>
  cases.filter(
    (c) =>
      (scenario && c.scenario.includes(scenario)) ||
      (categorySlug &&
        products.some((p) => p.category === categorySlug && p.scenario?.some((s) => c.scenario.includes(s))))
  ).slice(0, n);
export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
export const casesByIds = (ids: string[]) => cases.filter((c) => ids.includes(c.id));
