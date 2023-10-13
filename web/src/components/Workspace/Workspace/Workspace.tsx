import { Fragment, useEffect, useId, useRef, useState } from 'react'

import { Tab } from '@headlessui/react'
import { TbDownload, TbFileZip } from 'react-icons/tb'
import type {
  FindWorkspaceQuery,
  FindWorkspaceQueryVariables,
} from 'types/graphql'

import { Link, navigate, routes, useLocation } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { MetaTags } from '@redwoodjs/web'
import type { CellSuccessProps } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import CreatePanelButton from 'src/components/CreatePanelButton'
import DeletePanelButton from 'src/components/DeletePanelButton'
import LoginPopup from 'src/components/LoginPopup'
import Panel from 'src/components/Panel/Panel'
import PanelCell from 'src/components/Panel/PanelCell'
import { QUERY } from 'src/components/Workspace/WorkspaceCell'
import { useWorkspace } from 'src/components/WorkspaceProvider'
import { languages } from 'src/lib/languages'

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

const Workspace = ({
  workspace,
}: {
  workspace?: CellSuccessProps<
    FindWorkspaceQuery,
    FindWorkspaceQueryVariables
  >['workspace']
}) => {
  const { isAuthenticated } = useAuth()
  const { search } = useLocation()
  const [defaultPanel, setDefaultPanel] = useState(0)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const { workspaceSettings, setWorkspaceSettings } = useWorkspace()

  const title = workspace?.title || 'Workspace'

  const titleInputRef = useRef<HTMLInputElement>(null)

  const workspaceId = useId()
  const panelId = useId()
  const id = workspace?.id || workspaceId
  const panels = workspace?.panels || [
    { id: panelId, settings: { language: 'javascript' } },
  ]
  const panelsCount = panels.length

  const [updateWorkspaceSetting] = useMutation(
    UPDATE_WORKSPACE_SETTING_MUTATION,
    {
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const [updateWorkspace] = useMutation(UPDATE_WORKSPACE_MUTATION, {
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY, variables: { id } }],
  })

  useEffect(() => {
    const el = titleInputRef.current

    if (!el) return

    el.size = title.length || 1
  }, [title])

  useEffect(() => {
    const params = new URLSearchParams(search)

    const panel = params.get('panel')

    if (!panel) {
      setDefaultPanel(0)
    } else {
      setDefaultPanel(parseInt(panel) - 1)
    }
  }, [search])

  useEffect(() => {
    if (isAuthenticated) return

    const localWorkspace = localStorage.getItem('syntaxshare.workspaceSettings')

    if (localWorkspace) setWorkspaceSettings(JSON.parse(localWorkspace))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      updateWorkspaceSetting({
        variables: { id: workspace.settings.id, input: workspaceSettings },
      })

      return
    }

    localStorage.setItem(
      'syntaxshare.workspaceSettings',
      JSON.stringify(workspaceSettings)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, workspaceSettings])

  return (
    <>
      <MetaTags
        title={!isAuthenticated ? 'Share beautiful code snippets' : title}
      />

      <header className="mb-6 flex items-center justify-between space-x-4">
        <h1>
          {isAuthenticated ? (
            <input
              ref={titleInputRef}
              className="-ml-3 min-w-[calc(8ch_+_1.5rem)] rounded-md bg-transparent px-3 py-2 transition-colors focus:bg-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              defaultValue={title}
              placeholder="Untitled"
              onChange={(e) => {
                e.target.size = e.target.value.length
              }}
              onBlur={(e) =>
                updateWorkspace({
                  variables: { id, input: { title: e.target.value } },
                })
              }
            />
          ) : (
            <button onClick={() => setIsLoginOpen(true)}>{title}</button>
          )}
        </h1>

        <div className="flex items-center space-x-1">
          <button
            className="flex items-center rounded-full p-2 text-sm font-semibold text-stone-400 transition-colors hover:bg-stone-700 hover:text-stone-200 focus-visible:text-stone-200"
            onClick={() => {
              const keyboardEvent = new KeyboardEvent('keydown', {
                metaKey: true,
                key: 's',
              })
              window.dispatchEvent(keyboardEvent)
            }}
          >
            <TbDownload aria-hidden className="h-5 w-5" />
            <span className="sr-only">Download</span>
          </button>

          {isAuthenticated && panelsCount > 1 && (
            <Link
              to={routes.download({ id: workspace.id })}
              className="flex items-center rounded-full p-2 text-sm font-semibold text-stone-400 transition-colors hover:bg-stone-700 hover:text-stone-200 focus-visible:text-stone-200"
            >
              <TbFileZip aria-hidden className="h-5 w-5" />
              <span className="sr-only">Download All</span>
            </Link>
          )}
        </div>
      </header>

      <Tab.Group manual selectedIndex={defaultPanel}>
        <div className="relative z-10 flex items-center border-b-2 border-stone-700">
          <Tab.List className="-mb-[2px] flex items-center overflow-x-auto">
            {isAuthenticated ? (
              panels.map((panel, i) => {
                const language =
                  languages.find((l) => l.id === panel?.settings?.language) ||
                  languages.find((l) => l.id === 'javascript')

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
                                      id,
                                    }
                                  : {
                                      id,
                                      panel: i + 1,
                                    }
                              )
                            )
                          }
                          className={`${
                            selected
                              ? 'border-emerald-500 text-stone-200'
                              : 'border-transparent text-stone-400'
                          } ${
                            panelsCount > 1 ? 'pr-10' : 'pr-3'
                          } flex items-center rounded-t-md border-b-2 py-2 pl-3 text-sm font-semibold transition-colors hover:bg-stone-700 hover:text-stone-200 focus:outline-none focus-visible:ring focus-visible:ring-inset`}
                        >
                          <language.icon aria-hidden className="mr-1 h-5 w-5" />
                          <span>{panel.title || language.name}</span>
                        </button>
                      )}
                    </Tab>

                    {panelsCount > 1 && (
                      <DeletePanelButton
                        workspaceId={id}
                        panelId={panel.id}
                        panelsCount={panelsCount}
                      />
                    )}
                  </div>
                )
              })
            ) : (
              <Tab as={Fragment}>
                <button className="flex items-center rounded-t-md border-b-2 border-emerald-500 py-2 pl-3 pr-3 text-sm font-semibold text-stone-200 transition-colors hover:bg-stone-700 hover:text-stone-200 focus:outline-none focus-visible:ring focus-visible:ring-inset">
                  Panel 1
                </button>
              </Tab>
            )}
          </Tab.List>

          {panels.length < 10 && (
            <CreatePanelButton
              workspaceId={workspace?.id}
              panelsCount={workspace?.panels.length}
            />
          )}
        </div>

        <Tab.Panels>
          {isAuthenticated ? (
            panels.map((panel) => (
              <Tab.Panel
                key={panel.id}
                className="relative z-0 pt-6 focus-visible:outline-none focus-visible:ring"
              >
                <PanelCell id={panel.id} />
              </Tab.Panel>
            ))
          ) : (
            <Tab.Panel className="relative z-0 pt-6 focus-visible:outline-none focus-visible:ring">
              <Panel />
            </Tab.Panel>
          )}
        </Tab.Panels>
      </Tab.Group>

      <LoginPopup
        isOpen={isLoginOpen}
        setIsOpen={setIsLoginOpen}
        notification="Log in to change the workspace title."
      />
    </>
  )
}

export default Workspace
