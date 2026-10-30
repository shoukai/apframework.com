import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps {
  title: string
  path: string
  description?: string
  image?: string
  alternates?: Metadata['alternates']
}

export function genPageMetadata({
  title,
  path,
  description,
  image,
  alternates,
}: PageSEOProps): Metadata {
  const url = new URL(path, siteMetadata.siteUrl).toString()
  const pageDescription = description || siteMetadata.description

  return {
    title,
    description: pageDescription,
    alternates: { ...alternates, canonical: alternates?.canonical || url },
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: pageDescription,
      url,
      siteName: siteMetadata.title,
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: siteMetadata.locale,
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      description: pageDescription,
      card: 'summary_large_image',
      images: image ? [image] : [siteMetadata.socialBanner],
    },
  }
}
