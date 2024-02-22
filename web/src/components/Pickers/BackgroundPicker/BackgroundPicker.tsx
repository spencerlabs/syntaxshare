import { Fragment } from 'react'

import { RadioGroup, Tab } from '@headlessui/react'

import { usePanel } from 'src/components/PanelProvider'
import { colors, gradients } from 'src/lib/colors'

const BackgroundPicker = () => {
  const { panelSettings, setPanelSettings } = usePanel()

  const defaultSelected = [...colors, ...gradients].find(
    (c) =>
      c.from === panelSettings.gradientFrom && c.to === panelSettings.gradientTo
  )

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

          <Tab.Panel className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4 text-sm">
            <div>
              <label
                htmlFor="gradientFrom"
                className="mb-1 block text-xs font-bold"
              >
                From color
              </label>
              <div className="flex items-stretch">
                <span className="flex items-center rounded-l-md bg-stone-700 px-2">
                  #
                </span>

                <input
                  id="gradientFrom"
                  defaultValue={panelSettings.gradientFrom}
                  className="flex-1 rounded-r-md bg-stone-800 px-2 py-1 outline-none ring-inset ring-emerald-500 focus:bg-stone-700 focus-visible:ring-2"
                  onChange={(e) =>
                    setPanelSettings({
                      ...panelSettings,
                      gradientFrom: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="gradientTo"
                className="mb-1 block text-xs font-bold"
              >
                To color
              </label>
              <div className="flex items-stretch">
                <span className="flex items-center rounded-l-md bg-stone-700 px-2">
                  #
                </span>
                <input
                  id="gradientTo"
                  defaultValue={panelSettings.gradientTo}
                  className="flex-1 rounded-r-md bg-stone-800 px-2 py-1 outline-none ring-inset ring-emerald-500 focus:bg-stone-700 focus-visible:ring-2"
                  onChange={(e) =>
                    setPanelSettings({
                      ...panelSettings,
                      gradientTo: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </RadioGroup>
  )
}

export default BackgroundPicker
