import SkillProjectPage, { skillProjectMetadata } from '@/components/SkillProjectPage'
import { articlePublisherDetail } from '@/data/skillProjectDetails'

export const metadata = skillProjectMetadata(articlePublisherDetail)

export default function OpenContextForgeArticlePublisherPage() {
  return <SkillProjectPage detail={articlePublisherDetail} />
}
