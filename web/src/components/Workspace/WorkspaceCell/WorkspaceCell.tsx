import { TbCodeCircle } from 'react-icons/tb'
import type {
  FindWorkspaceQuery,
  FindWorkspaceQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Workspace from 'src/components/Workspace/Workspace'
import WorkspaceProvider from 'src/components/WorkspaceProvider'

export const QUERY = gql`
  query FindWorkspaceQuery($id: String!) {
    workspace: workspace(id: $id) {
      id
      title
      settings {
        id
        size
      }
      panels {
        id
        title
        settings {
          language
        }
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
    <div className="text-center text-lg font-semibold">
      Loading workspace...
    </div>
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindWorkspaceQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  workspace,
}: CellSuccessProps<FindWorkspaceQuery, FindWorkspaceQueryVariables>) => {
  return (
    <WorkspaceProvider workspace={workspace}>
      <Workspace workspace={workspace} />
    </WorkspaceProvider>
  )
}
