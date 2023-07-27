import { Fragment, useState } from 'react'

import { RadioGroup, Switch, Tab } from '@headlessui/react'

import { usePanel } from 'src/components/Panel/Panel'

export const colors = [
  { from: '10b981', to: '10b981' },
  { from: 'ef4444', to: 'ef4444' },
  { from: '8b5cf6', to: '8b5cf6' },
  { from: '64748b', to: '64748b' },
  { from: 'eab308', to: 'eab308' },
  { from: '3b82f6', to: '3b82f6' },
  { from: 'ec4899', to: 'ec4899' },
  { from: 'f97316', to: 'f97316' },
]

export const gradients = [
  { from: '047857', to: '6ee7b7' },
  { from: 'b91c1c', to: 'fca5a5' },
  { from: '6d28d9', to: 'c4b5fd' },
  { from: '334155', to: 'cbd5e1' },
  { from: 'a16207', to: 'fcd34d' },
  { from: '1d4ed8', to: '93c5fd' },
  { from: 'be185d', to: 'f9a8d4' },
  { from: 'c2410c', to: 'fdba74' },
]

const BackgroundPicker = () => {
  const { panelSettings, setPanelSettings } = usePanel()

  const defaultSelected = [...colors, ...gradients].find(
    (c) =>
      c.from === panelSettings.gradientFrom && c.to === panelSettings.gradientTo
  )

  const [isSolid, setIsSolid] = useState(false)

  return (
    <RadioGroup
      value={
        defaultSelected || {
          from: panelSettings.gradientFrom,
          to: panelSettings.gradientTo,
        }
      }
      onChange={(b) =>
        setPanelSettings({
          ...panelSettings,
          gradientFrom: b.from,
          gradientTo: b.to,
        })
      }
    >
      <RadioGroup.Label className="mb-1 block text-sm font-semibold uppercase text-stone-300">
        Background
      </RadioGroup.Label>
      <Tab.Group>
        <div className="relative z-10 flex items-center border-b-2 border-stone-700">
          <Tab.List className="-mb-[2px] flex items-center overflow-x-auto">
            {['Presets', 'Custom'].map((label) => (
              <Tab key={label} as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`${
                      selected
                        ? 'border-emerald-500 text-stone-200'
                        : 'border-transparent text-stone-400'
                    } flex items-center rounded-t-md border-b-2 px-3 py-2 text-xs font-semibold transition-colors hover:bg-stone-700 hover:text-stone-200 focus:outline-none focus-visible:ring focus-visible:ring-inset`}
                  >
                    {label}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
        </div>

        <Tab.Panels className="pt-3">
          <Tab.Panel>
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
                      {`Background color #${gradient.from}`}
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
          </Tab.Panel>

          <Tab.Panel>
            <Switch
              checked={isSolid}
              onChange={setIsSolid}
              className={`${isSolid ? 'bg-emerald-900' : 'bg-emerald-500'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${isSolid ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>

            <input
              defaultValue={panelSettings.gradientFrom}
              onChange={(e) =>
                setPanelSettings({
                  ...panelSettings,
                  gradientFrom: e.target.value,
                })
              }
            />
            {!isSolid && (
              <input
                defaultValue={panelSettings.gradientTo}
                onChange={(e) =>
                  setPanelSettings({
                    ...panelSettings,
                    gradientTo: e.target.value,
                  })
                }
              />
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </RadioGroup>
  )
}

export default BackgroundPicker
