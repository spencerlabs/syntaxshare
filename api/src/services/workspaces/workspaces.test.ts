import type { Workspace } from '@prisma/client'

import {
  workspaces,
  workspace,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
} from './workspaces'
import type { StandardScenario } from './workspaces.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('workspaces', () => {
  scenario('returns all workspaces', async (scenario: StandardScenario) => {
    const result = await workspaces()

    expect(result.length).toEqual(Object.keys(scenario.workspace).length)
  })

  scenario('returns a single workspace', async (scenario: StandardScenario) => {
    const result = await workspace({ id: scenario.workspace.one.id })

    expect(result).toEqual(scenario.workspace.one)
  })

  scenario('creates a workspace', async (scenario: StandardScenario) => {
    const result = await createWorkspace({
      input: { title: 'String', userId: scenario.workspace.two.userId },
    })

    expect(result.title).toEqual('String')
    expect(result.userId).toEqual(scenario.workspace.two.userId)
  })

  scenario('updates a workspace', async (scenario: StandardScenario) => {
    const original = (await workspace({
      id: scenario.workspace.one.id,
    })) as Workspace
    const result = await updateWorkspace({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a workspace', async (scenario: StandardScenario) => {
    const original = (await deleteWorkspace({
      id: scenario.workspace.one.id,
    })) as Workspace
    const result = await workspace({ id: original.id })

    expect(result).toEqual(null)
  })
})
