// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Panel> = (args) => {
//   return <Panel {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Panel from './Panel'

export const generated = () => {
  return <Panel />
}

export default {
  title: 'Components/Panel',
  component: Panel,
} as ComponentMeta<typeof Panel>
