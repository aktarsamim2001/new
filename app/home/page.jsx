

import HomeClient from "./HomeClient";
import { service } from "../../features/shared/_services/api_service";

export async function generateMetadata() {
  const res = await service.homepage({ slug: "home" });
  const seo = res || {};
  // This log will only show in server logs, not browser
  console.log("SEO Data:", res);
  return {
    title: seo?.meta_title || "Home | Sukaii",
    description: seo?.meta_description || "Welcome to Sukaii Home Page.",
    keywords: seo?.meta_keywords || "health, analytics, sukaii",
    authors: seo?.meta_author ? [{ name: seo.meta_author }] : [],
    openGraph: {
      images: seo?.feature_image ? [seo.feature_image] : [],
      title: seo?.meta_title || "Home | Sukaii",
      description: seo?.meta_description || "Welcome to Sukaii Home Page.",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.meta_title || "Home | Sukaii",
      description: seo?.meta_description || "Welcome to Sukaii Home Page.",
      images: seo?.feature_image ? [seo.feature_image] : [],
    },
  };
}

// No 'use client' here, so this is a server component
export default function HomePage() {
  return <HomeClient />;
}
