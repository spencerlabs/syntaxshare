import type { Prisma, Workspace } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.WorkspaceCreateArgs>({
  workspace: {
    one: {
      data: { title: 'String', user: { create: { email: 'String199690' } } },
    },
    two: {
      data: { title: 'String', user: { create: { email: 'String2226863' } } },
    },
  },
})

export type StandardScenario = ScenarioData<Workspace, 'workspace'>
