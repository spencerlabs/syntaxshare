// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof BackgroundPicker> = (args) => {
//   return <BackgroundPicker {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import BackgroundPicker from './BackgroundPicker'

export const generated = () => {
  return <BackgroundPicker />
}

export default {
  title: 'Components/BackgroundPicker',
  component: BackgroundPicker,
} as ComponentMeta<typeof BackgroundPicker>
