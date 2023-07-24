import { useEffect, useState } from 'react'

import { defaultKeymap, historyKeymap, history } from '@codemirror/commands'
import { lintGutter } from '@codemirror/lint'
import { EditorState, Transaction, Annotation, Text } from '@codemirror/state'
import { oneDark } from '@codemirror/theme-one-dark'
import { drawSelection, keymap } from '@codemirror/view'
import { EditorView, basicSetup } from 'codemirror'

import { Language } from 'src/lib/languages'

interface UseCodeMirrorProps {
  defaultValue?: Text
  editorRef: React.RefObject<HTMLElement>
  language: Language
  onUpdate?: (doc: Text | string) => void
  outputRef: React.RefObject<HTMLElement>
}

const useCodeMirror = ({
  defaultValue,
  editorRef,
  language,
  onUpdate,
  outputRef,
}: UseCodeMirrorProps) => {
  const [doc, setDoc] = useState<Text | string>(defaultValue || '')

  useEffect(() => {
    const editorEl = editorRef.current
    const outputEl = outputRef.current

    if (!editorEl || !outputEl) return

    const editorState = EditorState.create({
      doc: doc || '',
      extensions: [
        lintGutter(),
        basicSetup,
        language.lang(),
        oneDark,
        history(),
        drawSelection(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
      ],
    })

    const outputState = EditorState.create({
      doc: editorState.doc,
      extensions: [
        language.lang(),
        oneDark,
        EditorView.editable.of(false),
        EditorView.lineWrapping,
        drawSelection(),
      ],
    })

    const syncAnnotation = Annotation.define<boolean>()

    function syncDispatch(
      tr: Transaction,
      view: EditorView,
      other: EditorView
    ) {
      view.update([tr])
      if (!tr.changes.empty && !tr.annotation(syncAnnotation)) {
        const annotations: Annotation<unknown>[] = [syncAnnotation.of(true)]
        const userEvent = tr.annotation(Transaction.userEvent)
        if (userEvent) annotations.push(Transaction.userEvent.of(userEvent))
        other.dispatch({ changes: tr.changes, annotations })
      }

      setDoc(editor.state.doc)

      onUpdate && onUpdate(doc)
    }

    const output: EditorView = new EditorView({
      state: outputState,
      parent: outputEl,
      dispatch: (tr) => syncDispatch(tr, output, editor),
    })

    const editor: EditorView = new EditorView({
      parent: editorEl,
      state: editorState,
      dispatch: (tr) => syncDispatch(tr, editor, output),
    })

    editor.focus()

    return () => {
      editor.destroy()
      output.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  return {
    doc,
  }
}

export default useCodeMirror
