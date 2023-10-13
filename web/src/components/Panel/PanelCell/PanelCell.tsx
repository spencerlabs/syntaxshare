import type { FindPanelQuery, FindPanelQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Panel from 'src/components/Panel/Panel'
import PanelProvider from 'src/components/PanelProvider'

export const QUERY = gql`
  query FindPanelQuery($id: String!) {
    panel: panel(id: $id) {
      id
      title
      code
      workspaceId
      workspace {
        panels {
          id
        }
      }
      settings {
        id
        language
        codeSize
        gradientFrom
        gradientTo
      }
    }
  }
`

export const Loading = () => (
  <div aria-hidden className="grid grid-cols-1 gap-12 lg:grid-cols-2">
    <div className="aspect-square animate-pulse bg-stone-800"></div>
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindPanelQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  panel,
}: CellSuccessProps<FindPanelQuery, FindPanelQueryVariables>) => {
  return (
    <PanelProvider panel={panel}>
      <Panel panel={panel} />
    </PanelProvider>
  )
}
