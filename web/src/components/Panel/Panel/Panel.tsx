import { useEffect, useState } from 'react'

import type { FindPanelQuery, FindPanelQueryVariables } from 'types/graphql'

import type { CellSuccessProps } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Editor from 'src/components/Editor'

interface IPanel {
  panel?: CellSuccessProps<FindPanelQuery, FindPanelQueryVariables>['panel']
}

const Panel = ({ panel }: IPanel) => {
  const { isAuthenticated } = useAuth()

  const [language, setLanguage] = useState(
    isAuthenticated
      ? panel.settings.language
      : localStorage.getItem('syntaxsnap.language') || 'javascript'
  )

  useEffect(() => {
    const localLang = localStorage.getItem('syntaxsnap.language')
    if (localLang) {
      setLanguage(localLang)
    }
  }, [localStorage])

  return (
    <Editor
      lang={language}
      panelId={panel?.id}
      panelSettingId={panel?.settings.id}
    />
  )
}

export default Panel
