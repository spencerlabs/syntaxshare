// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CreatePanelButton> = (args) => {
//   return <CreatePanelButton {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CreatePanelButton from './CreatePanelButton'

export const generated = () => {
  return <CreatePanelButton />
}

export default {
  title: 'Components/CreatePanelButton',
  component: CreatePanelButton,
} as ComponentMeta<typeof CreatePanelButton>
