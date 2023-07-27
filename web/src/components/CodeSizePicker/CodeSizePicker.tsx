import { RadioGroup } from '@headlessui/react'

import { usePanel } from 'src/components/Panel/Panel'

export const codeSizes = [
  { class: 'text-xs', label: 'Small', id: 'small' },
  { class: 'text-sm', label: 'Medium', id: 'medium' },
  { class: 'text-base', label: 'Large', id: 'large' },
]

const CodeSizePicker = () => {
  const { panelSettings, setPanelSettings } = usePanel()

  return (
    <RadioGroup
      value={panelSettings.codeSize}
      onChange={(c) => setPanelSettings({ ...panelSettings, codeSize: c })}
    >
      <RadioGroup.Label className="mb-1 block text-sm font-semibold uppercase text-stone-300">
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
              value={size.id}
              className={({ checked }) =>
                `${
                  checked
                    ? 'outline-none ring-inset ring-emerald-500 focus-visible:ring-2'
                    : 'opacity-50 focus-visible:opacity-100 '
                } py cursor-pointer rounded-md bg-stone-700 px-3 py-2 text-center text-sm font-semibold transition-opacity hover:opacity-100 focus-visible:ring-inset`
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
  )
}

export default CodeSizePicker
