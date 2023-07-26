import {
  Fragment,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import { RadioGroup, Tab } from '@headlessui/react'
import { toPng } from 'html-to-image'
import { TbSettings } from 'react-icons/tb'

import { useCodeMirror, useWindowResize } from 'src/hooks'
import { aspectRatios } from 'src/lib/aspectRatios'
import { Language, languages } from 'src/lib/languages'

const EditorContext = createContext<{
  language: Language
}>({
  language: languages[1],
})

interface IEditor {
  lang: string
}

const colors = [
  { from: '10b981', to: '10b981' },
  { from: 'ef4444', to: 'ef4444' },
  { from: '8b5cf6', to: '8b5cf6' },
  { from: '64748b', to: '64748b' },
  { from: 'eab308', to: 'eab308' },
  { from: '3b82f6', to: '3b82f6' },
  { from: 'ec4899', to: 'ec4899' },
  { from: 'f97316', to: 'f97316' },
]

const gradients = [
  { from: '047857', to: '6ee7b7' },
  { from: 'b91c1c', to: 'fca5a5' },
  { from: '6d28d9', to: 'c4b5fd' },
  { from: '334155', to: 'cbd5e1' },
  { from: 'a16207', to: 'fcd34d' },
  { from: '1d4ed8', to: '93c5fd' },
  { from: 'be185d', to: 'f9a8d4' },
  { from: 'c2410c', to: 'fdba74' },
]

const codeSizes = [
  { class: 'text-xs', label: 'Small' },
  { class: 'text-sm', label: 'Medium' },
  { class: 'text-base', label: 'Large' },
]

const Editor = ({ lang }: IEditor) => {
  const language = languages.find((l) => l.id === lang)

  const [containerScale, setContainerScale] = useState<string>('')
  const [selectedGradient, setSelectedGradient] = useState(gradients[0])
  const [selectedRatio, setSelectedRatio] = useState('square')
  const [selectedFontSize, setSelectedFontSize] = useState('text-sm')
  const [selectedLanguage, setSelectedLanguage] = useState(language)
  const [selectedTitle, setSelectedTitle] = useState(selectedLanguage.name)

  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)

  useCodeMirror({
    editorRef,
    language: selectedLanguage,
  })

  const onTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSelectedTitle(e.target.value)
  }

  const onDownload = useCallback(() => {
    const containerEl = containerRef.current

    if (!containerEl) return

    toPng(containerEl, {
      cacheBust: true,
      canvasHeight: aspectRatios[selectedRatio].canvasHeight,
      canvasWidth: aspectRatios[selectedRatio].canvasWidth,
    }).then((dataUrl) => {
      const createEl = document.createElement('a')

      createEl.href = dataUrl
      createEl.download = `syntaxsnap_${encodeURIComponent(
        selectedTitle.toLocaleLowerCase() ||
          selectedLanguage.name.toLocaleLowerCase()
      )}.png`
      createEl.click()
      createEl.remove()
    })
  }, [selectedLanguage, selectedRatio, selectedTitle])

  const handleContainerScale = () => {
    const containerEl = containerRef.current

    if (!containerEl) return

    const ratio = aspectRatios[selectedRatio]

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

  useWindowResize(handleContainerScale, [selectedRatio])

  useEffect(() => {
    handleContainerScale()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRatio])

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
  }, [onDownload])

  return (
    <EditorContext.Provider value={{ language: selectedLanguage }}>
      <article className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div
          id="output-view"
          ref={containerRef}
          className={`${aspectRatios[selectedRatio].padding} relative`}
        >
          <div
            className="absolute left-1/2 top-1/2 mx-auto flex origin-top-left -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center bg-gradient-to-br p-8"
            aria-hidden
            style={
              {
                '--tw-gradient-from': `#${selectedGradient.from} var(--tw-gradient-from-position)`,
                '--tw-gradient-to': `#${selectedGradient.to} var(--tw-gradient-to-position)`,
                '--tw-gradient-stops':
                  'var(--tw-gradient-from), var(--tw-gradient-to)',
                height: aspectRatios[selectedRatio].height,
                scale: containerScale,
                width: aspectRatios[selectedRatio].width,
              } as React.CSSProperties
            }
          >
            <div className="flex max-h-full w-full flex-col overflow-hidden rounded-md bg-stone-800">
              <div className="relative flex items-center justify-center px-10 py-1">
                <div
                  aria-hidden
                  className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center space-x-1 px-2"
                >
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
                <input
                  ref={titleRef}
                  className="w-[min-content] bg-transparent text-center font-mono text-2xs font-semibold leading-none"
                  defaultValue={selectedTitle}
                  onChange={onTitleChange}
                />
              </div>
              <div className="overflow-y-auto">
                <div
                  ref={editorRef}
                  className={`${selectedFontSize} h-full w-full flex-1 overflow-y-auto rounded-md`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
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
                        } flex items-center rounded-t-md border-b-2 px-3 py-2 font-mono text-sm font-semibold transition-colors hover:bg-stone-700 hover:text-stone-200 focus:outline-none focus-visible:ring focus-visible:ring-inset`}
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
              <Tab.Panel className="space-y-6">
                <RadioGroup
                  value={selectedLanguage}
                  onChange={setSelectedLanguage}
                >
                  <RadioGroup.Label className="mb-1 block font-mono text-sm font-semibold uppercase text-stone-300">
                    Language
                  </RadioGroup.Label>
                  <div className="w-full overflow-x-auto">
                    <div
                      className="grid w-[max-content] gap-3"
                      style={{
                        gridTemplateColumns: `repeat(${languages.length}, minmax(0, 1fr))`,
                      }}
                    >
                      {languages.map((lang) => (
                        <RadioGroup.Option
                          key={lang.id}
                          value={lang}
                          className={({ checked }) =>
                            `${
                              checked
                                ? 'outline-none ring-inset ring-emerald-500 focus-visible:ring-2'
                                : 'opacity-50 focus-visible:opacity-100 '
                            } flex cursor-pointer flex-col items-center rounded-md bg-stone-700 px-3 py-2 text-center font-mono text-sm font-semibold transition-opacity hover:opacity-100 focus-visible:ring-inset`
                          }
                        >
                          <lang.icon aria-hidden className="mb-px h-6 w-6" />
                          <RadioGroup.Label className="cursor-pointer whitespace-nowrap">
                            {lang.name}
                          </RadioGroup.Label>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </div>
                </RadioGroup>

                <RadioGroup
                  value={selectedGradient}
                  onChange={setSelectedGradient}
                >
                  <RadioGroup.Label className="mb-1 block font-mono text-sm font-semibold uppercase text-stone-300">
                    Background
                  </RadioGroup.Label>
                  <div className="mb-3 w-full overflow-x-auto">
                    <div
                      className="grid w-[max-content] gap-3"
                      style={{
                        gridTemplateColumns: `repeat(${gradients.length}, minmax(0, 1fr))`,
                      }}
                    >
                      {colors.map((gradient) => (
                        <RadioGroup.Option
                          key={`${gradient.from}-${gradient.to}`}
                          value={gradient}
                          className={({ checked }) =>
                            `${
                              checked
                                ? 'outline-none ring-inset ring-emerald-500 focus-visible:ring-2'
                                : 'opacity-50 focus-visible:opacity-100'
                            } block h-12 w-12 cursor-pointer rounded-md bg-gradient-to-br text-center transition-opacity hover:opacity-100`
                          }
                          style={
                            {
                              '--tw-gradient-from': `#${gradient.from} var(--tw-gradient-from-position)`,
                              '--tw-gradient-to': `#${gradient.to} var(--tw-gradient-to-position)`,
                              '--tw-gradient-stops':
                                'var(--tw-gradient-from), var(--tw-gradient-to)',
                            } as React.CSSProperties
                          }
                        >
                          <RadioGroup.Label className="sr-only">
                            {`Background gradient from #${gradient.from} to #${gradient.to}`}
                          </RadioGroup.Label>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </div>

                  <div className="w-full overflow-x-auto">
                    <div
                      className="grid w-[max-content] gap-3"
                      style={{
                        gridTemplateColumns: `repeat(${gradients.length}, minmax(0, 1fr))`,
                      }}
                    >
                      {gradients.map((gradient) => (
                        <RadioGroup.Option
                          key={`${gradient.from}-${gradient.to}`}
                          value={gradient}
                          className={({ checked }) =>
                            `${
                              checked
                                ? 'outline-none ring-inset ring-emerald-500 focus-visible:ring-2'
                                : 'opacity-50 focus-visible:opacity-100'
                            } block h-12 w-12 cursor-pointer rounded-md bg-gradient-to-br text-center transition-opacity hover:opacity-100`
                          }
                          style={
                            {
                              '--tw-gradient-from': `#${gradient.from} var(--tw-gradient-from-position)`,
                              '--tw-gradient-to': `#${gradient.to} var(--tw-gradient-to-position)`,
                              '--tw-gradient-stops':
                                'var(--tw-gradient-from), var(--tw-gradient-to)',
                            } as React.CSSProperties
                          }
                        >
                          <RadioGroup.Label className="sr-only">
                            {`Background gradient from #${gradient.from} to #${gradient.to}`}
                          </RadioGroup.Label>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </div>
                </RadioGroup>

                <RadioGroup
                  value={selectedFontSize}
                  onChange={setSelectedFontSize}
                >
                  <RadioGroup.Label className="mb-1 block font-mono text-sm font-semibold uppercase text-stone-300">
                    Code Size
                  </RadioGroup.Label>
                  <div className="w-full overflow-x-auto">
                    <div
                      className="grid w-[max-content] gap-3"
                      style={{
                        gridTemplateColumns: `repeat(${codeSizes.length}, minmax(0, 1fr))`,
                      }}
                    >
                      {codeSizes.map((size) => (
                        <RadioGroup.Option
                          key={size.class}
                          value={size.class}
                          className={({ checked }) =>
                            `${
                              checked
                                ? 'outline-none ring-inset ring-emerald-500 focus-visible:ring-2'
                                : 'opacity-50 focus-visible:opacity-100 '
                            } py cursor-pointer rounded-md bg-stone-700 px-3 py-2 text-center font-mono text-sm font-semibold transition-opacity hover:opacity-100 focus-visible:ring-inset`
                          }
                        >
                          <RadioGroup.Label className="cursor-pointer">
                            {size.label}
                          </RadioGroup.Label>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </div>
                </RadioGroup>
              </Tab.Panel>

              <Tab.Panel className="space-y-6">
                <RadioGroup value={selectedRatio} onChange={setSelectedRatio}>
                  <RadioGroup.Label className="mb-1 block font-mono text-sm font-semibold uppercase text-stone-300">
                    Aspect Ratio
                  </RadioGroup.Label>
                  <div className="w-full overflow-x-auto">
                    <div
                      className="grid w-[max-content] gap-3"
                      style={{
                        gridTemplateColumns: `repeat(${
                          Object.keys(aspectRatios).length
                        }, minmax(0, 1fr))`,
                      }}
                    >
                      {Object.keys(aspectRatios).map((ratio) => (
                        <RadioGroup.Option
                          key={ratio}
                          value={ratio}
                          className={({ checked }) =>
                            `${
                              checked
                                ? 'outline-none ring-inset ring-emerald-500 focus-visible:ring-2'
                                : 'opacity-50 focus-visible:opacity-100'
                            } cursor-pointer rounded-md bg-stone-700 px-3 py-2 text-center font-mono text-sm font-semibold transition-opacity hover:opacity-100`
                          }
                        >
                          <RadioGroup.Label className="cursor-pointer">
                            <span className="block">
                              {aspectRatios[ratio].label.split(' ')[0]}
                            </span>
                            <span>
                              {aspectRatios[ratio].label.split(' ')[1]}
                            </span>
                          </RadioGroup.Label>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </div>
                </RadioGroup>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </article>
    </EditorContext.Provider>
  )
}

export const useEditor = () => {
  return useContext(EditorContext)
}

export default Editor
