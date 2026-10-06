import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robot(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
