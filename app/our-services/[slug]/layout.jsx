import { Metadata } from 'next';

export async function generateMetadata({ params }) {
  const { slug } = params;
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/web/services/details`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ slug })
  }).then(res => res.json());
  const seo = res?.data || {};

  if (!seo) {
    return {
      title: 'Service Not Found - Sukaii',
      description: 'The requested service could not be found.',
    };
  }

  return {
    title: seo.meta_title || 'Service Details - Sukaii',
    description: seo.meta_description || 'Explore our health service details and book your test today.',
    openGraph: {
      title: seo.meta_title || 'Service Details - Sukaii',
      description: seo.meta_description || 'Explore our health service details and book your test today.',
      images: seo.meta_image ? [{ url: seo.meta_image }] : [],
    },
  };
}

export default function ServiceDetailsLayout({ children }) {
  return children;
}
