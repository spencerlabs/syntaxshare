import { Menu } from '@headlessui/react'
import {
  TbCopy,
  TbDotsVertical,
  // TbEye,
  // TbEyeOff,
  TbTrash,
  TbX,
} from 'react-icons/tb'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Workspace/WorkspacesCell'

// const UPDATE_WORKSPACE_VISIBILITY_MUTATION = gql`
//   mutation UpdateWorkspaceVisibilityMutation(
//     $id: String!
//     $input: UpdateWorkspaceInput!
//   ) {
//     updateWorkspace(id: $id, input: $input) {
//       visibility
//     }
//   }
// `

const DUPLICATE_WORKSPACE_MUTATION = gql`
  mutation DuplicateWorkspaceMutation($id: String!) {
    duplicateWorkspace(id: $id) {
      id
    }
  }
`

const DELETE_WORKSPACE_MUTATION = gql`
  mutation DeleteWorkspaceMutation($id: String!) {
    deleteWorkspace(id: $id) {
      id
    }
  }
`

interface WorkspaceMenuProps {
  workspaceId: string
  visible?: boolean
}

const WorkspaceMenu = ({ workspaceId }: WorkspaceMenuProps) => {
  // const [updateWorkspace] = useMutation(UPDATE_WORKSPACE_VISIBILITY_MUTATION, {
  //   onCompleted: ({ updateWorkspace }) => {
  //     toast.success(
  //       `Workspace visibility is now ${updateWorkspace.visibility.toLocaleLowerCase()}`
  //     )
  //   },
  //   onError: (error) => {
  //     toast.error(error.message)
  //   },
  //   refetchQueries: [{ query: QUERY }],
  //   awaitRefetchQueries: true,
  // })

  const [duplicateWorkspace] = useMutation(DUPLICATE_WORKSPACE_MUTATION, {
    onCompleted: ({ duplicateWorkspace }) => {
      toast.success('Workspace duplicated')
      navigate(routes.workspace({ id: duplicateWorkspace.id }))
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [deleteWorkspace] = useMutation(DELETE_WORKSPACE_MUTATION, {
    onCompleted: () => {
      toast.success('Workspace deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const menuItems = [
    // {
    //   label: 'Visibility',
    //   icon: !visible ? TbEyeOff : TbEye,
    //   onClick: () =>
    //     updateWorkspace({
    //       variables: {
    //         id: workspaceId,
    //         input: {
    //           visibility: visible ? 'private' : 'public',
    //         },
    //       },
    //     }),
    // },
    {
      label: 'Duplicate',
      icon: TbCopy,
      onClick: () => duplicateWorkspace({ variables: { id: workspaceId } }),
    },
    {
      label: 'Delete',
      icon: TbTrash,
      className: 'text-red-400 hover:bg-red-700 hover:text-red-100',
      onClick: () => deleteWorkspace({ variables: { id: workspaceId } }),
    },
  ]

  return (
    <Menu>
      <Menu.Button className="absolute -right-px -top-px z-20 flex items-center rounded-bl-md bg-stone-900 p-2 transition-colors hover:bg-stone-700">
        {({ open }) => {
          const Icon = open ? TbX : TbDotsVertical

          return (
            <>
              <Icon className="h-4 w-4" aria-hidden />
              <span className="sr-only">More options</span>
            </>
          )
        }}
      </Menu.Button>
      <Menu.Items className="relative z-20 flex w-full items-stretch divide-x divide-stone-700 border-t border-stone-700">
        {menuItems.map((item, i) => (
          <Menu.Item key={i}>
            {({ active }) => (
              <button
                className={`${active ? 'bg-stone-700' : 'bg-transparent'} ${
                  item.className ? item.className : 'hover:bg-stone-700'
                } flex flex-1 items-center justify-center p-2 transition-colors`}
                onClick={item.onClick}
              >
                <item.icon className="h-5 w-5" aria-hidden />
                <span className="sr-only">{item.label}</span>
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  )
}

export default WorkspaceMenu
