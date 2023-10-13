import { TbTrash } from 'react-icons/tb'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Workspace/WorkspaceCell'

const DELETE_PANEL_MUTATION = gql`
  mutation DeletePanelMutation($id: String!) {
    deletePanel(id: $id) {
      id
    }
  }
`

interface IDeletePanelButton {
  workspaceId: string
  panelId: string
  panelsCount: number
}

const DeletePanelButton = ({
  workspaceId,
  panelId,
  panelsCount,
}: IDeletePanelButton) => {
  const [deletePanel] = useMutation(DELETE_PANEL_MUTATION, {
    onCompleted: () => {
      navigate(
        routes.workspace(
          panelsCount < 3
            ? { id: workspaceId }
            : { id: workspaceId, panel: panelsCount - 1 }
        )
      )
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY, variables: { id: workspaceId } }],
    awaitRefetchQueries: true,
  })

  return (
    <button
      onClick={() => deletePanel({ variables: { id: panelId } })}
      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-500 transition-colors hover:bg-stone-700 hover:text-red-300"
    >
      <TbTrash aria-hidden className="h-4 w-4" />
      <span className="sr-only">{`Delete panel ${panelId}`}</span>
    </button>
  )
}

export default DeletePanelButton
