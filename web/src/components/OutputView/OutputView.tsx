import { forwardRef, useEffect, useRef, useState } from 'react'

import { useCombinedRefs, useWindowResize } from 'src/hooks'
import { aspectRatios } from 'src/lib/aspectRatios'

interface OutputViewProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  codeRef: React.RefObject<HTMLDivElement>
}

const OutputView = forwardRef<HTMLDivElement, OutputViewProps>(
  ({ codeRef, ...props }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null)
    const containerRef = useCombinedRefs<HTMLDivElement>(internalRef, ref)

    const [containerScale, setContainerScale] = useState<string>('')

    const settings = {
      aspectRatio: 'square',
      gradientFrom: '047857',
      gradientTo: '6ee7b7',
      title: 'JavaScript',
      fontSize: 'base',
      handle: '#syntaxsnap',
      profileImage: '',
    }

    const handleContainerScale = () => {
      const containerEl = containerRef.current

      if (!containerEl) return

      const ratio = aspectRatios[settings.aspectRatio]

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

    useWindowResize(handleContainerScale, [settings.aspectRatio])

    useEffect(() => {
      handleContainerScale()

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings.aspectRatio])

    return (
      <div
        ref={containerRef}
        {...props}
        id="output-view"
        className={`${aspectRatios[settings.aspectRatio].padding} relative`}
      >
        <div
          className="absolute left-1/2 top-1/2 mx-auto flex origin-top-left -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center bg-gradient-to-br p-8"
          aria-hidden
          style={
            {
              '--tw-gradient-from': `#${settings.gradientFrom} var(--tw-gradient-from-position)`,
              '--tw-gradient-to': `#${settings.gradientTo} var(--tw-gradient-to-position)`,
              '--tw-gradient-stops':
                'var(--tw-gradient-from), var(--tw-gradient-to)',
              height: aspectRatios[settings.aspectRatio].height,
              scale: containerScale,
              width: aspectRatios[settings.aspectRatio].width,
            } as React.CSSProperties
          }
        >
          <div className="flex max-h-full w-full flex-col overflow-hidden rounded-md bg-stone-800">
            <div className="relative px-2 py-1">
              <div
                aria-hidden
                className="absolute left-0 top-1/2 flex -translate-y-1/2 items-center space-x-1 px-2"
              >
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <h3 className="px-10 text-center font-mono text-2xs font-semibold leading-none">
                {settings.title}
              </h3>
            </div>
            <div className="overflow-y-auto">
              <div
                ref={codeRef}
                className={`${settings.fontSize} h-full w-full flex-1 overflow-y-auto rounded-md`}
              />
            </div>
          </div>

          {(settings.handle || settings.profileImage) && (
            <div className="absolute bottom-0 left-0 right-0 flex h-8 w-full items-center justify-center space-x-1 py-1 text-center text-2xs font-semibold text-stone-700">
              {settings.profileImage && (
                <div className="h-6 w-6 overflow-hidden rounded-full">
                  <img
                    src={settings.profileImage}
                    alt=""
                    className="object-cover"
                  />
                </div>
              )}
              <span>{settings.handle}</span>
            </div>
          )}
        </div>
      </div>
    )
  }
)

export default OutputView
