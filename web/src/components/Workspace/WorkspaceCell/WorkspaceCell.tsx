import type {
  FindWorkspaceQuery,
  FindWorkspaceQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindWorkspaceQuery($id: String!) {
    workspace: workspace(id: $id) {
      id
      title
      panels {
        id
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindWorkspaceQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  workspace,
}: CellSuccessProps<FindWorkspaceQuery, FindWorkspaceQueryVariables>) => {
  return <div>{JSON.stringify(workspace)}</div>
}
