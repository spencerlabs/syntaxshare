// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CreateLocalWorkspace> = (args) => {
//   return <CreateLocalWorkspace {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CreateLocalWorkspace from './CreateLocalWorkspace'

export const generated = () => {
  return <CreateLocalWorkspace />
}

export default {
  title: 'Components/CreateLocalWorkspace',
  component: CreateLocalWorkspace,
} as ComponentMeta<typeof CreateLocalWorkspace>
