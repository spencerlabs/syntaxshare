import { createContext, useContext, useRef } from 'react'

import LanguagePicker from 'src/components/LanguagePicker'
import OutputView from 'src/components/OutputView'
import { useCodeMirror } from 'src/hooks'
import { Language, languages } from 'src/lib/languages'

const EditorContext = createContext<{
  language: Language
}>({
  language: languages[1],
})

interface IEditor {
  lang: string
  panelId: string
  panelSettingId: string
}

const Editor = ({ lang, panelId, panelSettingId }: IEditor) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  const language = languages.find((l) => l.id === lang)

  useCodeMirror({
    editorRef,
    language,
    outputRef,
  })

  return (
    <EditorContext.Provider value={{ language }}>
      <article className="space-y-2">
        <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <LanguagePicker
                language={language}
                panelId={panelId}
                panelSettingId={panelSettingId}
              />
            </div>

            <div ref={editorRef} className="rounded-md" />
          </div>

          <OutputView codeRef={outputRef} />
        </div>
      </article>
    </EditorContext.Provider>
  )
}

export const useEditor = () => {
  return useContext(EditorContext)
}

export default Editor
