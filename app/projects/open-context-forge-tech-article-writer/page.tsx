import SkillProjectPage, { skillProjectMetadata } from '@/components/SkillProjectPage'
import { techArticleWriterDetail } from '@/data/skillProjectDetails'

export const metadata = skillProjectMetadata(techArticleWriterDetail)

export default function OpenContextForgeTechArticleWriterPage() {
  return <SkillProjectPage detail={techArticleWriterDetail} />
}
