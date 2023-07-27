import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const CREATE_WORKSPACE_MUTATION = gql`
  mutation CreateWorkspaceMutation($input: CreateWorkspaceInput!) {
    createWorkspace(input: $input) {
      id
    }
  }
`

const CreateWorkspaceButton = () => {
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
    <button
      className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-stone-900 transition-colors hover:bg-emerald-600"
      onClick={() =>
        createWorkspace({
          variables: { input: { title: 'Untitled' } },
        })
      }
    >
      New Workspace
    </button>
  )
}

export default CreateWorkspaceButton
