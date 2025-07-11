import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          {siteMetadata.facebook && (
            <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
          )}
          {siteMetadata.youtube && (
            <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
          )}
          {siteMetadata.linkedin && (
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          )}
          {siteMetadata.twitter && (
            <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
          )}
          {siteMetadata.x && (
            <SocialIcon kind="x" href={siteMetadata.x} size={6} />
          )}
          {siteMetadata.instagram && (
            <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
          )}
          {siteMetadata.threads && (
            <SocialIcon kind="threads" href={siteMetadata.threads} size={6} />
          )}
          {siteMetadata.jike && (
            <SocialIcon kind="jike" href={siteMetadata.jike} size={6} />
          )}
          {siteMetadata.rss && (
            <SocialIcon kind="rss" href={siteMetadata.rss} size={6} />
          )}
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© 2025`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=21010602000309">
            辽公网安备 21010602000309 号
          </Link>
        </div>
      </div>
    </footer>
  )
}
