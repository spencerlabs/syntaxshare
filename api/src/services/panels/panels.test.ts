import type { Panel } from '@prisma/client'

import { panels, panel, createPanel, updatePanel, deletePanel } from './panels'
import type { StandardScenario } from './panels.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('panels', () => {
  scenario('returns all panels', async (scenario: StandardScenario) => {
    const result = await panels()

    expect(result.length).toEqual(Object.keys(scenario.panel).length)
  })

  scenario('returns a single panel', async (scenario: StandardScenario) => {
    const result = await panel({ id: scenario.panel.one.id })

    expect(result).toEqual(scenario.panel.one)
  })

  scenario('creates a panel', async (scenario: StandardScenario) => {
    const result = await createPanel({
      input: { workspaceId: scenario.panel.two.workspaceId },
    })

    expect(result.workspaceId).toEqual(scenario.panel.two.workspaceId)
  })

  scenario('updates a panel', async (scenario: StandardScenario) => {
    const original = (await panel({ id: scenario.panel.one.id })) as Panel
    const result = await updatePanel({
      id: original.id,
      input: { workspaceId: scenario.panel.two.workspaceId },
    })

    expect(result.workspaceId).toEqual(scenario.panel.two.workspaceId)
  })

  scenario('deletes a panel', async (scenario: StandardScenario) => {
    const original = (await deletePanel({ id: scenario.panel.one.id })) as Panel
    const result = await panel({ id: original.id })

    expect(result).toEqual(null)
  })
})
