// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof LoginPasswordlessForm> = (args) => {
//   return <LoginPasswordlessForm {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import LoginPasswordlessForm from './LoginPasswordlessForm'

export const generated = () => {
  return <LoginPasswordlessForm />
}

export default {
  title: 'Components/LoginPasswordlessForm',
  component: LoginPasswordlessForm,
} as ComponentMeta<typeof LoginPasswordlessForm>
