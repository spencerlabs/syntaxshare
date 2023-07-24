import type { ComponentMeta, ComponentStory } from '@storybook/react'

import WorkspacePage from './WorkspacePage'

export const generated: ComponentStory<typeof WorkspacePage> = (args) => {
  return <WorkspacePage id={'42'} {...args} />
}

export default {
  title: 'Pages/WorkspacePage',
  component: WorkspacePage,
} as ComponentMeta<typeof WorkspacePage>
