import { createContext, useContext, useEffect, useState } from 'react'

import isEqual from 'lodash.isequal'
import type { FindPanelQuery, FindPanelQueryVariables } from 'types/graphql'

import type { CellSuccessProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { gradients } from 'src/components/BackgroundPicker'
import Editor from 'src/components/Editor'
import { QUERY } from 'src/components/Workspace/WorkspaceCell'

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

type PanelDetails = {
  title?: string
  code: string
}

type PanelSettings = {
  [x: string]: unknown
  language: string
  gradientFrom: string
  gradientTo?: string
  codeSize: string
}

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

interface IPanelContext {
  panelDetails: PanelDetails
  setPanelDetails: React.Dispatch<React.SetStateAction<PanelDetails>>
  panelSettings: PanelSettings
  setPanelSettings: React.Dispatch<React.SetStateAction<PanelSettings>>
}

const PanelContext = createContext<IPanelContext>({
  panelDetails: detailDefaults,
  setPanelDetails: () => {},
  panelSettings: settingDefaults,
  setPanelSettings: () => {},
})

interface IPanel {
  panel?: CellSuccessProps<FindPanelQuery, FindPanelQueryVariables>['panel']
}

const Panel = ({ panel }: IPanel) => {
  const { isAuthenticated } = useAuth()

  const defaultDetails = panel
    ? { title: panel.title, code: panel.code }
    : detailDefaults

  const defaultSettings = panel?.settings
    ? {
        language: panel.settings.language,
        gradientFrom: panel.settings.gradientFrom,
        gradientTo: panel.settings.gradientTo,
        codeSize: panel.settings.codeSize,
      }
    : settingDefaults

  const [panelDetails, setPanelDetails] = useState(defaultDetails)
  const [panelSettings, setPanelSettings] = useState(defaultSettings)

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
  }, [isAuthenticated])

  useEffect(() => {
    if (isEqual(defaultDetails, panelDetails)) return

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
    if (isEqual(defaultSettings, panelSettings)) return

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

  return (
    <PanelContext.Provider
      value={{ panelDetails, setPanelDetails, panelSettings, setPanelSettings }}
    >
      <Editor />
    </PanelContext.Provider>
  )
}

export const usePanel = () => {
  return useContext(PanelContext)
}

export default Panel
