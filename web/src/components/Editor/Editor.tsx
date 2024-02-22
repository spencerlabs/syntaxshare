import { Fragment, createElement, useCallback, useEffect, useRef } from 'react'

import { Tab } from '@headlessui/react'
import download from 'downloadjs'
import { toPng } from 'html-to-image'
import { TbInfoCircle, TbSourceCode, TbLayoutGrid } from 'react-icons/tb'

import { useAuth } from 'src/auth'
import BackgroundPicker from 'src/components/Pickers/BackgroundPicker'
import CodeSizePicker from 'src/components/Pickers/CodeSizePicker'
import LanguagePicker from 'src/components/Pickers/LanguagePicker'
import OutputView from 'src/components/OutputView'
import { usePanel } from 'src/components/PanelProvider'
import RatioPicker from 'src/components/Pickers/RatioPicker'
import { useWorkspace } from 'src/components/WorkspaceProvider'
import { aspectRatios } from 'src/lib/aspectRatios'
import { languages } from 'src/lib/languages'

const settingTabs = [
  {
    title: 'Panel',
    description: 'These settings apply to this panel only',
    icon: TbSourceCode,
    pickers: [LanguagePicker, BackgroundPicker, CodeSizePicker],
  },
  {
    title: 'Workspace',
    description: 'These settings apply across all panels in your workspace',
    icon: TbLayoutGrid,
    pickers: [RatioPicker],
  },
]

const Editor = () => {
  const { isAuthenticated } = useAuth()
  const { workspaceSettings } = useWorkspace()
  const { panelSettings } = usePanel()

  const language = languages.find((l) => l.id === panelSettings.language)

  const ratio = workspaceSettings.size

  const containerRef = useRef<HTMLDivElement>(null)

  const onDownload = useCallback(() => {
    const containerEl = containerRef.current

    const aspectRatio = aspectRatios[ratio]

    if (!containerEl || !aspectRatio) return

    toPng(containerEl, {
      cacheBust: true,
      canvasHeight: aspectRatio.canvasHeight,
      canvasWidth: aspectRatio.canvasWidth,
    })
      .then((dataUrl) => {
        download(
          dataUrl,
          `syntaxshare_${encodeURIComponent(
            language.name.toLocaleLowerCase()
          )}.png`
        )
      })
      .catch((e) => console.error(e))
  }, [containerRef, language, ratio])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && (e.key === 's')) {
        e.preventDefault()
        onDownload()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <article className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      <OutputView ref={containerRef} />

      <div className="space-y-8">
        {!isAuthenticated ? (
          <>
            <RatioPicker />

            <LanguagePicker />

            <BackgroundPicker />

            <CodeSizePicker />
          </>
        ) : (
          <Tab.Group>
            <div className="relative z-10 flex items-center border-b-2 border-stone-700">
              <Tab.List className="-mb-[2px] flex items-center overflow-x-auto">
                {settingTabs.map((tab, i) => (
                  <Tab key={i} as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`${
                          selected
                            ? 'border-emerald-500 text-stone-200'
                            : 'border-transparent text-stone-400'
                        } flex items-center rounded-t-md border-b-2 px-3 py-2 text-sm font-semibold transition-colors hover:bg-stone-700 hover:text-stone-200 focus:outline-none focus-visible:ring focus-visible:ring-inset`}
                      >
                        <tab.icon className="mr-1 h-5 w-5" aria-hidden />
                        {tab.title}
                      </button>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels>
              {settingTabs.map((tab, i) => (
                <Tab.Panel key={i} className="space-y-8">
                  <div className="flex text-stone-300">
                    <TbInfoCircle
                      aria-hidden
                      className="mr-2 h-5 w-5 shrink-0"
                    />
                    <p className="mt-[2px] text-xs">{tab.description}</p>
                  </div>

                  {tab.pickers.map((picker, j) => (
                    <Fragment key={j}>{createElement(picker)}</Fragment>
                  ))}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        )}
      </div>
    </article>
  )
}

export default Editor
