import { useEffect, useState } from 'react'

import download from 'downloadjs'
import { toPng } from 'html-to-image'
import JSZip from 'jszip'
import { TbCodeCircle, TbFileZip } from 'react-icons/tb'
import type {
  FindWorkspaceDownloadQuery,
  FindWorkspaceDownloadQueryVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import OutputView from 'src/components/OutputView'
import PanelProvider from 'src/components/PanelProvider'
import WorkspaceProvider from 'src/components/WorkspaceProvider'
import { aspectRatios } from 'src/lib/aspectRatios'

export const QUERY = gql`
  query FindWorkspaceDownloadQuery($id: String!) {
    workspace(id: $id) {
      id
      settings {
        size
      }
      panels {
        id
        title
        code
        settings {
          language
          codeSize
          gradientFrom
          gradientTo
        }
      }
    }
  }
`

export const Loading = () => (
  <div className="flex min-h-[75vh] w-full flex-col items-center justify-center px-wrap py-12">
    <TbCodeCircle
      className="h-10 w-10 animate-bounce text-emerald-500"
      aria-hidden
    />
    <div className="text-center text-lg font-semibold">
      Loading workspace...
    </div>
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindWorkspaceDownloadQuery>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  workspace,
}: CellSuccessProps<
  FindWorkspaceDownloadQuery,
  FindWorkspaceDownloadQueryVariables
>) => {
  const [isLoading, setIsLoading] = useState(true)

  const createZip = async () => {
    const panels = Array.from(document.getElementsByClassName('output-view'))
    const aspectRatio = aspectRatios[workspace?.settings?.size]

    if (panels.length === 0 || !aspectRatio) return

    const zip = new JSZip()

    for (let i = 0; i < panels.length; i++) {
      const panel = panels[i] as HTMLElement

      await toPng(panel, {
        cacheBust: true,
        canvasHeight: aspectRatio.canvasHeight,
        canvasWidth: aspectRatio.canvasWidth,
      })
        .then((dataUrl) => {
          const idx = dataUrl.indexOf('base64,') + 'base64,'.length
          const content = dataUrl.substring(idx)

          zip.file(
            `syntaxshare_${(i + 1).toString().padStart(2, '0')}.png`,
            content,
            { base64: true }
          )
        })
        .catch((e) => console.error(e))
    }

    await zip
      .generateAsync({ type: 'blob' })
      .then((content) => {
        download(content, 'syntaxshare.zip')
      })
      .catch((e) => console.error(e))

    navigate(routes.workspace({ id: workspace.id }))
  }

  useEffect(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (isLoading) return

    createZip()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])
  return (
    <WorkspaceProvider workspace={workspace}>
      <div
        aria-hidden
        className="relative -z-50 grid grid-cols-3 overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${
            workspace.panels.length || 1
          }, minmax(0, 1fr))`,
        }}
      >
        {workspace.panels.map((panel) => (
          <PanelProvider key={panel.id} panel={panel}>
            <OutputView />
          </PanelProvider>
        ))}
      </div>

      <div className="flex min-h-[75vh] w-full flex-col items-center justify-center px-wrap py-12">
        <TbFileZip
          className="h-10 w-10 animate-bounce text-emerald-500"
          aria-hidden
        />
        <div className="text-center text-lg font-semibold">
          Downloading images...
        </div>
      </div>
    </WorkspaceProvider>
  )
}
