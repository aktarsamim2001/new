import DynamicPageClient from './DynamicPage'
import { service } from '../../features/shared/_services/api_service'

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const res = await service.homepage({ slug });
  const pageData = res?.data?.data || {};
  const seo = pageData.meta || {};

  return {
    title: seo.meta_title || pageData.title || "title",
    description: seo.meta_description || "description",
    keywords: seo.meta_keywords || "",
    authors: [{ name: seo.meta_author || "author" }],
    openGraph: {
      images: [seo.meta_feature_image || ""],
      title: seo.meta_title || pageData.title || "",
      description: seo.meta_description || "",
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.meta_title || pageData.title || "",
      description: seo.meta_description || "",
      images: [seo.meta_feature_image || ""],
    },
  };
}

// Accept params in your page component
export default function Page() {
  return <DynamicPageClient />
}
