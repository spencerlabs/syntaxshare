// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof WorkspaceMenu> = (args) => {
//   return <WorkspaceMenu {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import WorkspaceMenu from './WorkspaceMenu'

export const generated = () => {
  return <WorkspaceMenu />
}

export default {
  title: 'Components/WorkspaceMenu',
  component: WorkspaceMenu,
} as ComponentMeta<typeof WorkspaceMenu>
