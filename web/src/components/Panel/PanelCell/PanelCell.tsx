import { TbCodeCircle } from 'react-icons/tb'
import type { FindPanelQuery, FindPanelQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Panel from 'src/components/Panel/Panel'

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
  <div className="flex min-h-[75vh] flex-col items-center justify-center px-wrap py-12">
    <TbCodeCircle
      className="h-10 w-10 animate-bounce text-emerald-500"
      aria-hidden
    />
    <div className="text-center font-mono text-lg font-semibold">
      Loading panel...
    </div>
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
  return <Panel panel={panel} />
}
