import type { ComponentMeta } from '@storybook/react'

import WorkspacesPage from './WorkspacesPage'

export const generated = () => {
  return <WorkspacesPage />
}

export default {
  title: 'Pages/WorkspacesPage',
  component: WorkspacesPage,
} as ComponentMeta<typeof WorkspacesPage>
