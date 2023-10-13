import { useState } from 'react'

import { TbCirclePlus } from 'react-icons/tb'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import LoginPopup from 'src/components/LoginPopup'
import { QUERY } from 'src/components/Workspace/WorkspaceCell'

const CREATE_PANEL_MUTATION = gql`
  mutation CreatePanelMutation($input: CreatePanelInput!) {
    createPanel(input: $input) {
      id
    }
  }
`

interface ICreatePanelButton {
  workspaceId: string
  panelsCount: number
}

const CreatePanelButton = ({
  workspaceId,
  panelsCount,
}: ICreatePanelButton) => {
  const { isAuthenticated } = useAuth()
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const [createPanel] = useMutation(CREATE_PANEL_MUTATION, {
    onCompleted: () => {
      navigate(
        routes.workspace({
          id: workspaceId,
          panel: panelsCount + 1,
        })
      )
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY, variables: { id: workspaceId } }],
    awaitRefetchQueries: true,
  })

  const onClick = () => {
    if (isAuthenticated) {
      createPanel({
        variables: { input: { workspaceId: workspaceId, code: '' } },
      })
    } else {
      setIsLoginOpen(true)
    }
  }

  return (
    <>
      <button
        className="rounded-t-full p-2 transition-colors hover:bg-stone-700"
        onClick={onClick}
      >
        <TbCirclePlus aria-hidden className="h-5 w-5" />
        <span className="sr-only">Add panel</span>
      </button>

      <LoginPopup
        isOpen={isLoginOpen}
        setIsOpen={setIsLoginOpen}
        notification="Log in to add extra panels to the workspace."
      />
    </>
  )
}

export default CreatePanelButton
