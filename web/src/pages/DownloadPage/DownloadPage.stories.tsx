import type { ComponentMeta, ComponentStory } from '@storybook/react'

import DownloadPage from './DownloadPage'

export const generated: ComponentStory<typeof DownloadPage> = (args) => {
  return <DownloadPage id={'42'} {...args} />
}

export default {
  title: 'Pages/DownloadPage',
  component: DownloadPage,
} as ComponentMeta<typeof DownloadPage>
