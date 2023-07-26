import { Fragment, useEffect, useId, useState } from 'react'

import { Tab } from '@headlessui/react'
import { TbDownload } from 'react-icons/tb'
import type {
  FindWorkspaceQuery,
  FindWorkspaceQueryVariables,
} from 'types/graphql'

import { navigate, routes, useLocation } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import type { CellSuccessProps } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import CreatePanelButton from 'src/components/CreatePanelButton'
import DeletePanelButton from 'src/components/DeletePanelButton'
import DeleteWorkspaceButton from 'src/components/DeleteWorkspaceButton'
import Panel from 'src/components/Panel/Panel'
import PanelCell from 'src/components/Panel/PanelCell'
import { languages } from 'src/lib/languages'

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

  const workspaceId = useId()
  const panelId = useId()
  const id = workspace?.id || workspaceId
  const panels = workspace?.panels || [
    { id: panelId, settings: { language: 'javascript' } },
  ]
  const panelsCount = panels.length
  const title = workspace?.title || 'Workspace'

  useEffect(() => {
    const params = new URLSearchParams(search)

    const panel = params.get('panel')

    if (!panel) {
      setDefaultPanel(0)
    } else {
      setDefaultPanel(parseInt(panel) - 1)
    }
  }, [search])

  return (
    <>
      <MetaTags title={title} />

      <header className="mb-6 flex items-center justify-between space-x-4">
        <h1>
          {isAuthenticated ? (
            <input className="bg-transparent" defaultValue={title} />
          ) : (
            title
          )}
        </h1>

        <div className="flex items-center space-x-1">
          {isAuthenticated && (
            <button className="flex items-center rounded-full p-2 font-mono text-sm font-semibold text-stone-400 transition-colors hover:bg-stone-700 hover:text-stone-200 focus-visible:text-stone-200">
              <TbDownload aria-hidden className="h-5 w-5" />
              <span className="sr-only">Download All</span>
            </button>
          )}

          {isAuthenticated && <DeleteWorkspaceButton workspaceId={id} />}
        </div>
      </header>

      {isAuthenticated ? (
        <Tab.Group manual selectedIndex={defaultPanel}>
          <div className="relative z-10 flex items-center border-b-2 border-stone-700">
            <Tab.List className="-mb-[2px] flex items-center overflow-x-auto">
              {panels.map((panel, i) => {
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
                          } flex items-center rounded-t-md border-b-2 py-2 pl-3 font-mono text-sm font-semibold transition-colors hover:bg-stone-700 hover:text-stone-200 focus:outline-none focus-visible:ring focus-visible:ring-inset`}
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
              })}
            </Tab.List>

            {panels.length < 10 && (
              <CreatePanelButton
                workspaceId={workspace.id}
                panelsCount={workspace.panels.length}
              />
            )}
          </div>

          <Tab.Panels>
            {panels.map((panel) => (
              <Tab.Panel
                key={panel.id}
                className="relative z-0 pt-6 focus-visible:outline-none focus-visible:ring"
              >
                <PanelCell id={panel.id} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      ) : (
        <Panel />
      )}
    </>
  )
}

export default Workspace
