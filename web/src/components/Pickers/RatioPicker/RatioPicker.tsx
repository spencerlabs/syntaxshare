import { RadioGroup } from '@headlessui/react'

import { useWorkspace } from 'src/components/WorkspaceProvider'
import { aspectRatios } from 'src/lib/aspectRatios'

const RatioPicker = () => {
  const { workspaceSettings, setWorkspaceSettings } = useWorkspace()

  return (
    <RadioGroup
      value={workspaceSettings.size}
      onChange={(s) => setWorkspaceSettings({ ...workspaceSettings, size: s })}
    >
      <RadioGroup.Label className="mb-1 block text-sm font-semibold uppercase text-stone-300">
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
                } cursor-pointer rounded-md bg-stone-700 px-3 py-2 text-center text-sm font-semibold transition-opacity hover:opacity-100`
              }
            >
              <RadioGroup.Label className="cursor-pointer">
                <span className="block">
                  {aspectRatios[ratio].label.split(' ')[0]}
                </span>
                <span>{aspectRatios[ratio].label.split(' ')[1]}</span>
              </RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </div>
    </RadioGroup>
  )
}

export default RatioPicker
