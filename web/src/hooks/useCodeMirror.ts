import { useEffect, useState } from 'react'

import {
  // autocompletion,
  completionKeymap,
  closeBrackets,
  closeBracketsKeymap,
} from '@codemirror/autocomplete'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import {
  defaultHighlightStyle,
  syntaxHighlighting,
  indentOnInput,
  bracketMatching,
} from '@codemirror/language'
import { lintKeymap } from '@codemirror/lint'
import { searchKeymap } from '@codemirror/search'
import { EditorState, Transaction, Text } from '@codemirror/state'
import { oneDark } from '@codemirror/theme-one-dark'
import { keymap, dropCursor } from '@codemirror/view'
import { EditorView } from 'codemirror'

import { Language } from 'src/lib/languages'

interface UseCodeMirrorProps {
  defaultValue?: Text
  editorRef: React.RefObject<HTMLElement>
  language: Language
  onUpdate?: (doc: Text | string) => void
}

const useCodeMirror = ({
  defaultValue,
  editorRef,
  language,
  onUpdate,
}: UseCodeMirrorProps) => {
  const [doc, setDoc] = useState<Text | string>(defaultValue || '')

  useEffect(() => {
    const editorEl = editorRef.current

    if (!editorEl) return

    const editorState = EditorState.create({
      doc: doc || '',
      extensions: [
        language.lang(),
        oneDark,
        history(),
        dropCursor(),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        bracketMatching(),
        closeBrackets(),
        EditorView.lineWrapping,
        keymap.of([
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...searchKeymap,
          ...historyKeymap,
          ...completionKeymap,
          ...lintKeymap,
        ]),
      ],
    })

    function syncDispatch(tr: Transaction, view: EditorView) {
      view.update([tr])
      setDoc(editor.state.doc)
      onUpdate && onUpdate(doc)
    }

    const editor: EditorView = new EditorView({
      parent: editorEl,
      state: editorState,
      dispatch: (tr) => syncDispatch(tr, editor),
    })

    if (document.activeElement === document.body) editor.focus()

    return () => {
      editor.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  return {
    doc,
  }
}

export default useCodeMirror
