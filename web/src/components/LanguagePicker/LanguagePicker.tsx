import { RadioGroup } from '@headlessui/react'

import { usePanel } from 'src/components/Panel/Panel'
import { languages } from 'src/lib/languages'

const LanguagePicker = () => {
  const { panelSettings, setPanelSettings } = usePanel()

  const lang = languages.find((l) => l.id === panelSettings.language)

  return (
    <RadioGroup
      value={lang}
      onChange={(l) => setPanelSettings({ ...panelSettings, language: l.id })}
    >
      <RadioGroup.Label className="mb-1 block text-sm font-semibold uppercase text-stone-300">
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
                } flex cursor-pointer flex-col items-center rounded-md bg-stone-700 px-3 py-2 text-center text-sm font-semibold transition-opacity hover:opacity-100 focus-visible:ring-inset`
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
  )
}

export default LanguagePicker
