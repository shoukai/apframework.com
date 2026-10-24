import SkillProjectPage, { skillProjectMetadata } from '@/components/SkillProjectPage'
import { bookReaderDetail } from '@/data/skillProjectDetails'

export const metadata = skillProjectMetadata(bookReaderDetail)

export default function OpenContextBookReaderPage() {
  return <SkillProjectPage detail={bookReaderDetail} />
}
