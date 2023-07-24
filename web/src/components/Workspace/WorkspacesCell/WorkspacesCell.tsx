import type { WorkspacesQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query WorkspacesQuery {
    workspaces {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <p>No workspaces found. Create a new one!</p>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ workspaces }: CellSuccessProps<WorkspacesQuery>) => {
  return (
    <ul>
      {workspaces.map((item) => {
        return (
          <li key={item.id}>
            <Link to={routes.workspace({ id: item.id })}>{item.id}</Link>
          </li>
        )
      })}
    </ul>
  )
}
