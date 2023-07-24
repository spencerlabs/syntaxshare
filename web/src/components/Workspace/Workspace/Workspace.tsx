import { Fragment, useEffect, useState } from 'react'

import { Tab } from '@headlessui/react'
import {
  TbCirclePlus,
  TbDownload,
  TbSettings,
  TbTrash,
  TbX,
} from 'react-icons/tb'
import type {
  FindWorkspaceQuery,
  FindWorkspaceQueryVariables,
} from 'types/graphql'

import {
  Form,
  TextField,
  SelectField,
  Label,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { navigate, routes, useLocation } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import type { CellSuccessProps } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import Modal from 'src/components/Modal'
import PanelCell from 'src/components/Panel/PanelCell'
import { QUERY } from 'src/components/Workspace/WorkspaceCell'
import { aspectRatios } from 'src/lib/aspectRatios'
import { languages } from 'src/lib/languages'

const CREATE_PANEL_MUTATION = gql`
  mutation CreatePanelMutation($input: CreatePanelInput!) {
    createPanel(input: $input) {
      id
    }
  }
`

const UPDATE_WORKSPACE_MUTATION = gql`
  mutation UpdateWorkspaceMutation(
    $id: String!
    $input: UpdateWorkspaceInput!
  ) {
    updateWorkspace(id: $id, input: $input) {
      id
    }
  }
`

const UPDATE_WORKSPACE_SETTING_MUTATION = gql`
  mutation UpdateWorkspaceSettingMutation(
    $id: String!
    $input: UpdateWorkspaceSettingInput!
  ) {
    updateWorkspaceSetting(id: $id, input: $input) {
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

const DELETE_PANEL_MUTATION = gql`
  mutation DeletePanelMutation($id: String!) {
    deletePanel(id: $id) {
      id
    }
  }
`

const Workspace = ({
  workspace,
}: CellSuccessProps<FindWorkspaceQuery, FindWorkspaceQueryVariables>) => {
  const { isAuthenticated } = useAuth()
  const { search } = useLocation()
  const [defaultPanel, setDefaultPanel] = useState(0)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const panelsCount = workspace.panels.length

  const [createPanel] = useMutation(CREATE_PANEL_MUTATION, {
    onCompleted: () => {
      toast.success('New panel created')
      navigate(
        routes.workspace({
          id: workspace.id,
          panel: workspace.panels.length + 1,
        })
      )
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY, variables: { id: workspace.id } }],
    awaitRefetchQueries: true,
  })

  const [updateWorkspace] = useMutation(UPDATE_WORKSPACE_MUTATION, {
    onCompleted: () => {
      toast.success('Workspace updated')
      setIsSettingsOpen(false)
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY, variables: { id: workspace.id } }],
    awaitRefetchQueries: true,
  })

  const [updateWorkspaceSetting] = useMutation(
    UPDATE_WORKSPACE_SETTING_MUTATION,
    {
      onCompleted: () => {
        toast.success('Workspace settings updated')
        setIsSettingsOpen(false)
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [{ query: QUERY, variables: { id: workspace.id } }],
      awaitRefetchQueries: true,
    }
  )

  const [deleteWorkspace] = useMutation(DELETE_WORKSPACE_MUTATION, {
    onCompleted: () => {
      toast.success('Workspace deleted')
      navigate(routes.home())
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY, variables: { id: workspace.id } }],
    awaitRefetchQueries: true,
  })

  useEffect(() => {
    const params = new URLSearchParams(search)

    const panel = params.get('panel')

    if (!panel) {
      setDefaultPanel(0)
    } else {
      setDefaultPanel(parseInt(panel) - 1)
    }
  }, [search])

  const onWorkspaceSubmit = (input: { title: string }) => {
    if (input.title === workspace.title) {
      setIsSettingsOpen(false)
      return
    }

    updateWorkspace({
      variables: {
        id: workspace.id,
        input,
      },
    })
  }

  const onSettingsSubmit = (input: { size: string }) => {
    if (input.size === workspace.settings.size) {
      setIsSettingsOpen(false)
      return
    }

    updateWorkspaceSetting({
      variables: {
        id: workspace.settings.id,
        input,
      },
    })
  }

  const [deletePanel] = useMutation(DELETE_PANEL_MUTATION, {
    onCompleted: () => {
      toast.success('Panel deleted')
      navigate(
        routes.workspace(
          panelsCount < 3
            ? { id: workspace.id }
            : { id: workspace.id, panel: panelsCount - 1 }
        )
      )
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY, variables: { id: workspace.id } }],
    awaitRefetchQueries: true,
  })

  return (
    <>
      <MetaTags title={workspace.title} />

      <header className="mb-6 flex items-center justify-between space-x-4">
        <h1>{workspace.title}</h1>

        <div className="flex items-center space-x-1">
          <button className="flex items-center rounded-full p-2 font-mono text-sm font-semibold text-stone-400 transition-colors hover:bg-stone-700 hover:text-stone-200 focus-visible:text-stone-200">
            <TbDownload aria-hidden className="h-5 w-5" />
            <span className="sr-only">Download All</span>
          </button>

          <button
            className="flex items-center rounded-full p-2 font-mono text-sm font-semibold text-stone-400 transition-colors hover:bg-stone-700 hover:text-stone-200 focus-visible:text-stone-200"
            onClick={() => setIsSettingsOpen(true)}
          >
            <TbSettings aria-hidden className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </button>

          <button
            className="flex items-center rounded-full p-2 font-mono text-sm font-semibold text-red-400 transition-colors hover:bg-stone-700 hover:text-red-400 focus-visible:text-red-400"
            onClick={() => deleteWorkspace({ variables: { id: workspace.id } })}
          >
            <TbTrash aria-hidden className="h-5 w-5" />
            <span className="sr-only">Delete Workspace</span>
          </button>
        </div>
      </header>

      <Tab.Group manual selectedIndex={defaultPanel}>
        <div className="relative z-10 flex items-center">
          <Tab.List className="flex items-center overflow-x-auto">
            {workspace.panels.map((panel, i) => {
              const language = languages.find(
                (l) => l.id === panel.settings.language
              )

              return (
                <div key={panel.id} className="relative flex items-center">
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        onClick={() =>
                          navigate(
                            routes.workspace(
                              i === 0
                                ? {
                                    id: workspace.id,
                                  }
                                : {
                                    id: workspace.id,
                                    panel: i + 1,
                                  }
                            )
                          )
                        }
                        className={`${
                          selected
                            ? 'border-emerald-500 text-stone-200'
                            : 'border-stone-700 text-stone-400'
                        } ${
                          panelsCount > 1 ? 'pr-10' : 'pr-3'
                        } flex items-center rounded-t-md border-b-2 py-2 pl-3 font-mono text-sm font-semibold transition-colors hover:bg-stone-700 hover:text-stone-200 focus:outline-none focus-visible:ring focus-visible:ring-inset`}
                      >
                        <language.icon aria-hidden className="mr-1 h-5 w-5" />
                        <span>{panel.title || language.name}</span>
                      </button>
                    )}
                  </Tab>

                  {panelsCount > 1 && (
                    <button
                      onClick={() =>
                        deletePanel({ variables: { id: panel.id } })
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-500 transition-colors hover:bg-stone-700 hover:text-red-300"
                    >
                      <TbTrash aria-hidden className="h-4 w-4" />
                      <span className="sr-only">
                        {`Delete panel ${panel.title || panel.id} (${
                          panel.settings.language
                        })`}
                      </span>
                    </button>
                  )}
                </div>
              )
            })}
          </Tab.List>

          {isAuthenticated && workspace.panels.length < 10 && (
            <button
              className="ml-1 rounded-full p-2 transition-colors hover:bg-stone-700"
              onClick={() =>
                createPanel({
                  variables: { input: { workspaceId: workspace.id } },
                })
              }
            >
              <TbCirclePlus aria-hidden className="h-5 w-5" />
              <span className="sr-only">Add panel</span>
            </button>
          )}
        </div>

        <Tab.Panels>
          {workspace.panels.map((panel) => (
            <Tab.Panel
              key={panel.id}
              className="relative z-0 py-6 focus-visible:outline-none focus-visible:ring"
            >
              <PanelCell id={panel.id} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      <Modal
        isOpen={isSettingsOpen}
        setIsOpen={setIsSettingsOpen}
        title="Workspace Settings"
      >
        <Tab.Group>
          <Tab.List className="flex items-center">
            {['Details', 'Settings'].map((item) => (
              <Tab
                key={item}
                className={({ selected }) =>
                  `${
                    selected ? 'border-emerald-500' : 'border-stone-900'
                  } border-b-2 px-2 py-1`
                }
              >
                {item}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="pt-4">
            <Tab.Panel>
              <Form onSubmit={onWorkspaceSubmit}>
                <Label
                  name="title"
                  className="font-mono text-xs font-semibold uppercase text-stone-300"
                  errorClassName="text-xs font-mono font-semibold uppercase text-red-300"
                >
                  Title
                </Label>

                <TextField
                  name="title"
                  defaultValue={workspace?.title}
                  className="w-full rounded-md bg-stone-900 px-2 py-1 text-lg"
                />

                <FieldError name="title" className="text-red-300" />

                <div className="mt-4 flex items-center justify-center">
                  <Submit className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-stone-900 transition-colors hover:bg-emerald-600">
                    Save
                  </Submit>
                </div>
              </Form>
            </Tab.Panel>
            <Tab.Panel>
              <Form onSubmit={onSettingsSubmit}>
                <Label
                  name="size"
                  className="font-mono text-xs font-semibold uppercase text-stone-300"
                  errorClassName="text-xs font-mono font-semibold uppercase text-red-300"
                >
                  Size
                </Label>

                <SelectField
                  name="size"
                  defaultValue={workspace?.settings?.size}
                  className="w-full rounded-md bg-stone-900 px-2 py-1 text-lg"
                >
                  {Object.keys(aspectRatios).map((ratio) => (
                    <option key={ratio} value={ratio}>
                      {aspectRatios[ratio].label}
                    </option>
                  ))}
                </SelectField>

                <FieldError name="size" className="text-red-300" />

                <div className="mt-4 flex items-center justify-center">
                  <Submit className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-stone-900 transition-colors hover:bg-emerald-600">
                    Save
                  </Submit>
                </div>
              </Form>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </Modal>
    </>
  )
}

export default Workspace
