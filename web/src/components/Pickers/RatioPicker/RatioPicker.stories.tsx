// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof RatioPicker> = (args) => {
//   return <RatioPicker {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import RatioPicker from './RatioPicker'

export const generated = () => {
  return <RatioPicker />
}

export default {
  title: 'Components/RatioPicker',
  component: RatioPicker,
} as ComponentMeta<typeof RatioPicker>
