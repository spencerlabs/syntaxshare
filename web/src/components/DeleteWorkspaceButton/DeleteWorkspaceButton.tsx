import { TbTrash } from 'react-icons/tb'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { QUERY } from 'src/components/Workspace/WorkspacesCell'

const DELETE_WORKSPACE_MUTATION = gql`
  mutation DeleteWorkspaceMutation($id: String!) {
    deleteWorkspace(id: $id) {
      id
    }
  }
`

const DeleteWorkspaceButton = ({ workspaceId }: { workspaceId: string }) => {
  const { isAuthenticated } = useAuth()

  const [deleteWorkspace] = useMutation(DELETE_WORKSPACE_MUTATION, {
    onCompleted: () => {
      toast.success('Workspace deleted')
      navigate(routes.home())
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  if (!isAuthenticated) return <></>

  return (
    <button
      className="absolute -right-px -top-px z-20 flex items-center rounded-bl-md p-2 text-sm font-semibold text-red-400 transition-colors hover:bg-stone-700 hover:text-red-400 focus-visible:text-red-400"
      onClick={() => deleteWorkspace({ variables: { id: workspaceId } })}
    >
      <TbTrash aria-hidden className="h-5 w-5" />
      <span className="sr-only">Delete Workspace</span>
    </button>
  )
}

export default DeleteWorkspaceButton
