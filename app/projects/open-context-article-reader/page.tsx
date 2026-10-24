import SkillProjectPage, { skillProjectMetadata } from '@/components/SkillProjectPage'
import { articleReaderDetail } from '@/data/skillProjectDetails'

export const metadata = skillProjectMetadata(articleReaderDetail)

export default function OpenContextArticleReaderPage() {
  return <SkillProjectPage detail={articleReaderDetail} />
}
