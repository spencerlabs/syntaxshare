// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Workspace> = (args) => {
//   return <Workspace {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Workspace from './Workspace'

export const generated = () => {
  return <Workspace />
}

export default {
  title: 'Components/Workspace',
  component: Workspace,
} as ComponentMeta<typeof Workspace>
