// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof OutputView> = (args) => {
//   return <OutputView {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import OutputView from './OutputView'

export const generated = () => {
  return <OutputView />
}

export default {
  title: 'Components/OutputView',
  component: OutputView,
} as ComponentMeta<typeof OutputView>
