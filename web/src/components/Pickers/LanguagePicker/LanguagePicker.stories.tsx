// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof LanguagePicker> = (args) => {
//   return <LanguagePicker {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import LanguagePicker from './LanguagePicker'

export const generated = () => {
  return <LanguagePicker />
}

export default {
  title: 'Components/LanguagePicker',
  component: LanguagePicker,
} as ComponentMeta<typeof LanguagePicker>
