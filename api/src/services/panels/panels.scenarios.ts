import type { Prisma, Panel } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PanelCreateArgs>({
  panel: {
    one: {
      data: {
        workspace: {
          create: {
            title: 'String',
            user: { create: { email: 'String6206127' } },
          },
        },
      },
    },
    two: {
      data: {
        workspace: {
          create: {
            title: 'String',
            user: { create: { email: 'String4591430' } },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Panel, 'panel'>
