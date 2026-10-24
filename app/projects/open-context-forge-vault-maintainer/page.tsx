import SkillProjectPage, { skillProjectMetadata } from '@/components/SkillProjectPage'
import { vaultMaintainerDetail } from '@/data/skillProjectDetails'

export const metadata = skillProjectMetadata(vaultMaintainerDetail)

export default function OpenContextForgeVaultMaintainerPage() {
  return <SkillProjectPage detail={vaultMaintainerDetail} />
}
