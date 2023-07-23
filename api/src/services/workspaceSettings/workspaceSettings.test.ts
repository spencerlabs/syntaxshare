import type { WorkspaceSetting } from '@prisma/client'

import {
  workspaceSettings,
  workspaceSetting,
  createWorkspaceSetting,
  updateWorkspaceSetting,
  deleteWorkspaceSetting,
} from './workspaceSettings'
import type { StandardScenario } from './workspaceSettings.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('workspaceSettings', () => {
  scenario(
    'returns all workspaceSettings',
    async (scenario: StandardScenario) => {
      const result = await workspaceSettings()

      expect(result.length).toEqual(
        Object.keys(scenario.workspaceSetting).length
      )
    }
  )

  scenario(
    'returns a single workspaceSetting',
    async (scenario: StandardScenario) => {
      const result = await workspaceSetting({
        id: scenario.workspaceSetting.one.id,
      })

      expect(result).toEqual(scenario.workspaceSetting.one)
    }
  )

  scenario('creates a workspaceSetting', async () => {
    const result = await createWorkspaceSetting({
      input: { size: 'String', handle: 'String', gradientFrom: 'String' },
    })

    expect(result.size).toEqual('String')
    expect(result.handle).toEqual('String')
    expect(result.gradientFrom).toEqual('String')
  })

  scenario('updates a workspaceSetting', async (scenario: StandardScenario) => {
    const original = (await workspaceSetting({
      id: scenario.workspaceSetting.one.id,
    })) as WorkspaceSetting
    const result = await updateWorkspaceSetting({
      id: original.id,
      input: { size: 'String2' },
    })

    expect(result.size).toEqual('String2')
  })

  scenario('deletes a workspaceSetting', async (scenario: StandardScenario) => {
    const original = (await deleteWorkspaceSetting({
      id: scenario.workspaceSetting.one.id,
    })) as WorkspaceSetting
    const result = await workspaceSetting({ id: original.id })

    expect(result).toEqual(null)
  })
})
