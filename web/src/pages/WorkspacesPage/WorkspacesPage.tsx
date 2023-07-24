import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import WorkspacesCell from 'src/components/Workspace/WorkspacesCell'

const CREATE_WORKSPACE_MUTATION = gql`
  mutation CreateUserMutation($input: CreateWorkspaceInput!) {
    createWorkspace(input: $input) {
      id
    }
  }
`

const WorkspacesPage = () => {
  const [createWorkspace] = useMutation(CREATE_WORKSPACE_MUTATION, {
    onCompleted: ({ createWorkspace }) => {
      toast.success('New workspace created')

      navigate(routes.workspace({ id: createWorkspace.id }))
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <>
      <MetaTags title="Workspaces" />

      <header className="mb-6 flex items-center justify-between space-x-4">
        <h1>Workspaces</h1>
        <button
          className="rounded-md bg-emerald-500 px-3 py-2 font-mono text-sm font-semibold text-stone-900 transition-colors hover:bg-emerald-600"
          onClick={() =>
            createWorkspace({ variables: { input: { title: 'Untitled' } } })
          }
        >
          New Workspace
        </button>
      </header>

      <WorkspacesCell />
    </>
  )
}

export default WorkspacesPage
