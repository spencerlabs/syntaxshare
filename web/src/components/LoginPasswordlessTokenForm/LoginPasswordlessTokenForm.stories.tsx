// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof LoginPasswordlessTokenForm> = (args) => {
//   return <LoginPasswordlessTokenForm {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import LoginPasswordlessTokenForm from './LoginPasswordlessTokenForm'

export const generated = () => {
  return <LoginPasswordlessTokenForm />
}

export default {
  title: 'Components/LoginPasswordlessTokenForm',
  component: LoginPasswordlessTokenForm,
} as ComponentMeta<typeof LoginPasswordlessTokenForm>
