import type { WorkspacesQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { MetaTags } from '@redwoodjs/web'

import CreateLocalWorkspace from 'src/components/CreateLocalWorkspace'
import WorkspaceMenu from 'src/components/WorkspaceMenu'
import { aspectRatios } from 'src/lib/aspectRatios'
import { languages } from 'src/lib/languages'

export const QUERY = gql`
  query WorkspacesQuery {
    workspaces {
      id
      title
      visibility
      settings {
        size
      }
      panels {
        id
        settings {
          language
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => (
  <>
    <CreateLocalWorkspace />
    <p className="text-center">No workspaces found. Create a new one!</p>
  </>
)

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ workspaces }: CellSuccessProps<WorkspacesQuery>) => {
  return (
    <>
      <MetaTags title="Workspaces" />

      <CreateLocalWorkspace />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {workspaces.map((workspace) => (
          <article
            key={workspace.id}
            className="relative flex flex-col overflow-hidden rounded-md border border-stone-700"
          >
            <div className="flex-1 p-4 transition-colors hover:bg-stone-700">
              <h2 className="h3">
                <Link
                  to={routes.workspace({ id: workspace.id })}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {workspace.title}
                </Link>
              </h2>

              <p className="text-sm font-semibold text-stone-400">
                {aspectRatios[workspace.settings.size].label}
              </p>

              <ul className="mt-2 flex flex-wrap items-center">
                {workspace.panels.map((panel, i) => {
                  const language = languages.find(
                    (l) => l.id === panel.settings.language
                  )

                  return (
                    <li
                      key={panel.id}
                      className={`${
                        workspace.panels.length !== i + 1 ? 'mr-2 ' : ''
                      }`}
                    >
                      <language.icon className="h-5 w-5" aria-hidden />
                      <span className="sr-only">{language.name}</span>
                    </li>
                  )
                })}
              </ul>
            </div>

            <WorkspaceMenu
              workspaceId={workspace.id}
              visible={workspace.visibility === 'public'}
            />
          </article>
        ))}
      </div>
    </>
  )
}
