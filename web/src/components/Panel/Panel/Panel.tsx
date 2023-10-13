import { useEffect } from 'react'

import type { FindPanelQuery, FindPanelQueryVariables } from 'types/graphql'

import type { CellSuccessProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import Editor from 'src/components/Editor'
import { usePanel } from 'src/components/PanelProvider'
import { QUERY } from 'src/components/Workspace/WorkspaceCell'
import { gradients } from 'src/lib/colors'

const UPDATE_PANEL_MUTATION = gql`
  mutation UpdatePanelMutation($id: String!, $input: UpdatePanelInput!) {
    updatePanel(id: $id, input: $input) {
      id
    }
  }
`
const UPDATE_PANEL_SETTING_MUTATION = gql`
  mutation UpdatePanelSettingMutation(
    $id: String!
    $input: UpdatePanelSettingInput!
  ) {
    updatePanelSetting(id: $id, input: $input) {
      id
    }
  }
`

export const detailDefaults = {
  title: '',
  code: '',
}

export const settingDefaults = {
  language: 'javascript',
  gradientFrom: gradients[0].from,
  gradientTo: gradients[0].to,
  codeSize: 'medium',
}

interface IPanel {
  panel?: CellSuccessProps<FindPanelQuery, FindPanelQueryVariables>['panel']
}

const Panel = ({ panel }: IPanel) => {
  const { isAuthenticated } = useAuth()

  const { panelDetails, setPanelDetails, panelSettings, setPanelSettings } =
    usePanel()

  const [updatePanel] = useMutation(UPDATE_PANEL_MUTATION, {
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY, variables: { id: panel?.workspaceId } }],
    awaitRefetchQueries: true,
  })

  const [updatePanelSetting] = useMutation(UPDATE_PANEL_SETTING_MUTATION, {
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY, variables: { id: panel?.workspaceId } }],
    awaitRefetchQueries: true,
  })

  useEffect(() => {
    if (isAuthenticated) return

    const localDetails = localStorage.getItem('syntaxshare.panelDetails')
    const localSettings = localStorage.getItem('syntaxshare.panelSettings')

    if (localDetails) setPanelDetails(JSON.parse(localDetails))
    if (localSettings) setPanelSettings(JSON.parse(localSettings))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      updatePanel({
        variables: { id: panel.id, input: panelDetails },
      })

      return
    }

    localStorage.setItem(
      'syntaxshare.panelDetails',
      JSON.stringify(panelDetails)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, panelDetails])

  useEffect(() => {
    if (isAuthenticated) {
      updatePanelSetting({
        variables: { id: panel.settings.id, input: panelSettings },
      })

      return
    }

    localStorage.setItem(
      'syntaxshare.panelSettings',
      JSON.stringify(panelSettings)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, panelSettings])

  return <Editor />
}

export default Panel
