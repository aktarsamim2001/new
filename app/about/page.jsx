import AboutClient from './AboutClient'
import { service } from '../../features/shared/_services/api_service'

export async function generateMetadata({params}) {
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const res = await service.homepage({ slug })
  const seo = res?.meta || {}

  return {
    title: seo?.meta_title || 'Untitled',
    description: seo?.meta_description || '',
    openGraph: {
      images: seo?.feature_image ? [seo.feature_image] : [],
    },
    twitter: {
      images: seo?.feature_image ? [seo.feature_image] : [],
    },
  }
}

export default function Page() {
  return <AboutClient />
}
