// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Editor> = (args) => {
//   return <Editor {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Editor from './Editor'

export const generated = () => {
  return <Editor />
}

export default {
  title: 'Components/Editor',
  component: Editor,
} as ComponentMeta<typeof Editor>
