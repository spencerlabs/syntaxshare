import type { PanelSetting } from '@prisma/client'

import {
  panelSettings,
  panelSetting,
  createPanelSetting,
  updatePanelSetting,
  deletePanelSetting,
} from './panelSettings'
import type { StandardScenario } from './panelSettings.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('panelSettings', () => {
  scenario('returns all panelSettings', async (scenario: StandardScenario) => {
    const result = await panelSettings()

    expect(result.length).toEqual(Object.keys(scenario.panelSetting).length)
  })

  scenario(
    'returns a single panelSetting',
    async (scenario: StandardScenario) => {
      const result = await panelSetting({ id: scenario.panelSetting.one.id })

      expect(result).toEqual(scenario.panelSetting.one)
    }
  )

  scenario('creates a panelSetting', async () => {
    const result = await createPanelSetting({
      input: {
        language: 'String',
        code: 'String',
        codeSize: 'String',
        gradientFrom: 'String',
      },
    })

    expect(result.language).toEqual('String')
    expect(result.code).toEqual('String')
    expect(result.codeSize).toEqual('String')
    expect(result.gradientFrom).toEqual('String')
  })

  scenario('updates a panelSetting', async (scenario: StandardScenario) => {
    const original = (await panelSetting({
      id: scenario.panelSetting.one.id,
    })) as PanelSetting
    const result = await updatePanelSetting({
      id: original.id,
      input: { language: 'String2' },
    })

    expect(result.language).toEqual('String2')
  })

  scenario('deletes a panelSetting', async (scenario: StandardScenario) => {
    const original = (await deletePanelSetting({
      id: scenario.panelSetting.one.id,
    })) as PanelSetting
    const result = await panelSetting({ id: original.id })

    expect(result).toEqual(null)
  })
})
