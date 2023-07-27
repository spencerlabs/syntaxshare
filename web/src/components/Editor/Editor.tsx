import { Fragment, useCallback, useEffect, useRef, useState } from 'react'

import { Tab } from '@headlessui/react'
import { toPng } from 'html-to-image'
import { TbInfoCircle, TbSettings } from 'react-icons/tb'

import { Form, TextField, Label } from '@redwoodjs/forms'

import { useAuth } from 'src/auth'
import BackgroundPicker from 'src/components/BackgroundPicker'
import CodeSizePicker from 'src/components/CodeSizePicker'
import { codeSizes } from 'src/components/CodeSizePicker'
import LanguagePicker from 'src/components/LanguagePicker'
import { usePanel } from 'src/components/Panel/Panel'
import RatioPicker from 'src/components/RatioPicker'
import { useWorkspace } from 'src/components/Workspace/Workspace'
import { useCodeMirror, useWindowResize } from 'src/hooks'
import { aspectRatios } from 'src/lib/aspectRatios'
import { languages } from 'src/lib/languages'

const Editor = () => {
  const { isAuthenticated } = useAuth()
  const { workspaceSettings } = useWorkspace()
  const { panelDetails, panelSettings, setPanelDetails } = usePanel()

  const language = languages.find((l) => l.id === panelSettings.language)

  const [containerScale, setContainerScale] = useState<string>('')

  const ratio = workspaceSettings.size

  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)

  const { doc } = useCodeMirror({
    defaultValue: panelDetails.code,
    editorRef,
    language,
  })

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
        const createEl = document.createElement('a')

        createEl.href = dataUrl
        createEl.download = `syntaxshare_${encodeURIComponent(
          language.name.toLocaleLowerCase()
        )}.png`
        createEl.click()
        createEl.remove()
      })
      .catch((e) => console.error(e.message))
  }, [containerRef, language, ratio])

  const handleContainerScale = () => {
    const containerEl = containerRef.current

    if (!containerEl) return

    const ratio = aspectRatios[workspaceSettings.size]

    const availableWidth = containerEl.offsetWidth
    const availableHeight = containerEl.offsetHeight

    const contentWidth = ratio.width
    const contentHeight = ratio.height

    setContainerScale(
      Math.min(
        availableWidth / contentWidth,
        availableHeight / contentHeight
      ).toFixed(3)
    )
  }

  useWindowResize(handleContainerScale, [ratio])

  useEffect(() => {
    handleContainerScale()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratio])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && (e.key === 'S' || e.key === 's')) {
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

  useEffect(() => {
    setPanelDetails({
      ...panelDetails,
      code: doc.toString(),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc])

  return (
    <article className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      <div
        id="output-view"
        ref={containerRef}
        className={`${aspectRatios[ratio].padding} relative`}
      >
        <div
          className="absolute left-1/2 top-1/2 mx-auto flex origin-top-left -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center bg-gradient-to-br p-8"
          aria-hidden
          style={
            {
              '--tw-gradient-from': `#${panelSettings.gradientFrom} var(--tw-gradient-from-position)`,
              '--tw-gradient-to': `#${panelSettings.gradientTo} var(--tw-gradient-to-position)`,
              '--tw-gradient-stops':
                'var(--tw-gradient-from), var(--tw-gradient-to)',
              height: aspectRatios[ratio].height,
              scale: containerScale,
              width: aspectRatios[ratio].width,
            } as React.CSSProperties
          }
        >
          <div className="flex max-h-full w-full flex-col overflow-hidden rounded-md bg-stone-800">
            <div className="relative flex items-center justify-center px-12">
              <div
                aria-hidden
                className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center space-x-1 px-2"
              >
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>

              <Form className="flex w-full items-center">
                <Label name="title" className="sr-only">
                  Panel Title
                </Label>
                <TextField
                  ref={titleRef}
                  name="title"
                  defaultValue={panelDetails?.title}
                  placeholder={language.name}
                  onChange={(e) =>
                    setPanelDetails({
                      ...panelDetails,
                      title: e.target.value,
                    })
                  }
                  className="w-full bg-transparent py-1 text-center text-2xs font-semibold leading-none placeholder:text-stone-200 placeholder:transition-colors focus:placeholder:text-stone-400"
                />
              </Form>
            </div>
            <div className="overflow-y-auto">
              <div
                ref={editorRef}
                className={`${
                  codeSizes.find((c) => c.id === panelSettings.codeSize).class
                } h-full w-full flex-1 overflow-y-auto rounded-md`}
              />
            </div>
          </div>
        </div>
      </div>

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
                {['Panel', 'Workspace'].map((label) => (
                  <Tab key={label} as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`${
                          selected
                            ? 'border-emerald-500 text-stone-200'
                            : 'border-transparent text-stone-400'
                        } flex items-center rounded-t-md border-b-2 px-3 py-2 text-sm font-semibold transition-colors hover:bg-stone-700 hover:text-stone-200 focus:outline-none focus-visible:ring focus-visible:ring-inset`}
                      >
                        <TbSettings className="mr-1 h-5 w-5" aria-hidden />
                        {label}
                      </button>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels>
              <Tab.Panel className="space-y-8">
                <div className="flex text-stone-300">
                  <TbInfoCircle aria-hidden className="mr-2 h-5 w-5 shrink-0" />
                  <p className="mt-[2px] text-xs">
                    These settings apply to this panel only
                  </p>
                </div>

                <LanguagePicker />

                <BackgroundPicker />

                <CodeSizePicker />
              </Tab.Panel>

              <Tab.Panel className="space-y-8">
                <div className="flex text-stone-300">
                  <TbInfoCircle aria-hidden className="mr-2 h-5 w-5 shrink-0" />
                  <p className="mt-[2px] text-xs">
                    These settings apply across all panels in your workspace
                  </p>
                </div>

                <RatioPicker />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        )}
      </div>
    </article>
  )
}

export default Editor
