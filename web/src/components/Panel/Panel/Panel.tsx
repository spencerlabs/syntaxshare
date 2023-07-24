import type { FindPanelQuery, FindPanelQueryVariables } from 'types/graphql'

import type { CellSuccessProps } from '@redwoodjs/web'

import Editor from 'src/components/Editor'

const Panel = ({
  panel,
}: CellSuccessProps<FindPanelQuery, FindPanelQueryVariables>) => {
  return (
    <Editor
      lang={panel.settings.language}
      panelId={panel.id}
      panelSettingId={panel.settings.id}
    />
  )
}

export default Panel
