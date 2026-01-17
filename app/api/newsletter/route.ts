// import { NewsletterAPI } from 'pliny/newsletter'
// import siteMetadata from '@/data/siteMetadata'
// import { NextResponse } from 'next/server'

// export const dynamic = 'force-static'

// let handler

// if (siteMetadata.newsletter?.provider) {
//   handler = NewsletterAPI({
//     // @ts-ignore
//     provider: siteMetadata.newsletter.provider,
//   })
// } else {
//   handler = () => NextResponse.json({ error: 'Newsletter not configured' }, { status: 501 })
// }

// export { handler as GET, handler as POST }

// Temporary fix: Disable newsletter route until provider is configured
import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export async function GET() {
  return NextResponse.json({ error: 'Newsletter not configured' }, { status: 501 })
}

export async function POST() {
  return NextResponse.json({ error: 'Newsletter not configured' }, { status: 501 })
}
