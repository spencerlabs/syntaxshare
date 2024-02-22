import { forwardRef, useEffect, useRef, useState } from 'react'

import { Form, TextField, Label } from '@redwoodjs/forms'

import { codeSizes } from 'src/components/Pickers/CodeSizePicker'
import { usePanel } from 'src/components/PanelProvider'
import { useWorkspace } from 'src/components/WorkspaceProvider'
import { useCodeMirror, useCombinedRefs, useWindowResize } from 'src/hooks'
import { aspectRatios } from 'src/lib/aspectRatios'
import { languages } from 'src/lib/languages'

interface OutputViewProps {}

const OutputView = forwardRef<HTMLDivElement, OutputViewProps>((props, ref) => {
  const { workspaceSettings } = useWorkspace()
  const { panelDetails, panelSettings, setPanelDetails } = usePanel()

  const language = languages.find((l) => l.id === panelSettings.language)

  const [containerScale, setContainerScale] = useState<string>('')

  const ratio = workspaceSettings.size

  const internalRef = useRef<HTMLDivElement>(null)
  const containerRef = useCombinedRefs(ref, internalRef)
  const editorRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)

  const { doc } = useCodeMirror({
    defaultValue: panelDetails.code,
    editorRef,
    language,
  })

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
    setPanelDetails({
      ...panelDetails,
      code: doc.toString(),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc])

  return (
    <div
      ref={containerRef}
      className={`${aspectRatios[ratio].padding} output-view relative`}
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
  )
})

export default OutputView
