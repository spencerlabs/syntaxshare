import type { Prisma, WorkspaceSetting } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.WorkspaceSettingCreateArgs>({
  workspaceSetting: {
    one: { data: { size: 'String', handle: 'String', gradientFrom: 'String' } },
    two: { data: { size: 'String', handle: 'String', gradientFrom: 'String' } },
  },
})

export type StandardScenario = ScenarioData<
  WorkspaceSetting,
  'workspaceSetting'
>
