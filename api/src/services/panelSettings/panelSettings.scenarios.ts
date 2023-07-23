import type { Prisma, PanelSetting } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PanelSettingCreateArgs>({
  panelSetting: {
    one: {
      data: {
        language: 'String',
        code: 'String',
        codeSize: 'String',
        gradientFrom: 'String',
      },
    },
    two: {
      data: {
        language: 'String',
        code: 'String',
        codeSize: 'String',
        gradientFrom: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<PanelSetting, 'panelSetting'>
