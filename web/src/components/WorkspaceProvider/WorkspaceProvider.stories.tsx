// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof WorkspaceProvider> = (args) => {
//   return <WorkspaceProvider {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import WorkspaceProvider from './WorkspaceProvider'

export const generated = () => {
  return <WorkspaceProvider />
}

export default {
  title: 'Components/WorkspaceProvider',
  component: WorkspaceProvider,
} as ComponentMeta<typeof WorkspaceProvider>
