import { Fragment } from 'react'

import { Listbox } from '@headlessui/react'
import { TbChevronDown } from 'react-icons/tb'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Panel/PanelCell'
import { Language, languages } from 'src/lib/languages'

const UPDATE_PANEL_LANG_MUTATION = gql`
  mutation UpdatePanelLangMutation(
    $id: String!
    $input: UpdatePanelSettingInput!
  ) {
    updatePanelSetting(id: $id, input: $input) {
      id
    }
  }
`

interface LanguagePickerProps {
  language: Language
  panelId: string
  panelSettingId: string
}

const LanguagePicker = ({
  language,
  panelId,
  panelSettingId,
}: LanguagePickerProps) => {
  const [updatePanelLang] = useMutation(UPDATE_PANEL_LANG_MUTATION, {
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY, variables: { id: panelId } }],
    awaitRefetchQueries: true,
  })

  const onChange = (value: Language) => {
    updatePanelLang({
      variables: { id: panelSettingId, input: { language: value.id } },
    })
  }

  return (
    <Listbox as="div" value={language} onChange={onChange} className="relative">
      {({ open }) => (
        <>
          <Listbox.Button className="flex items-center rounded-md bg-stone-700 px-2 py-1 font-mono text-sm font-semibold transition-colors hover:bg-stone-600 hover:text-stone-100">
            <language.icon aria-hidden className="mr-2 h-5 w-5" />
            <span>{language.name}</span>
            <TbChevronDown
              aria-hidden
              className={`${
                open ? '-rotate-180 ' : ''
              }ml-1 h-3 w-3 transition-transform`}
            />
          </Listbox.Button>
          <Listbox.Options className="absolute left-0 top-full z-10 mt-2 max-h-[50vh] w-max divide-y divide-stone-500 overflow-hidden overflow-y-auto rounded-md bg-stone-700 font-mono text-sm font-semibold">
            {languages.map((lang) => (
              <Listbox.Option key={lang.id} value={lang} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    className={`${active ? 'bg-stone-600 ' : ''}${
                      selected ? 'bg-stone-800 ' : ''
                    }px-2 flex items-center py-1 transition-colors hover:cursor-pointer`}
                  >
                    <lang.icon aria-hidden className="mr-2 h-5 w-5" />
                    <span>{lang.name}</span>
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </>
      )}
    </Listbox>
  )
}

export default LanguagePicker
