import { useEffect } from 'react'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { detailDefaults, settingDefaults } from 'src/components/Panel/Panel'

const CREATE_LOCAL_WORKSPACE_MUTATION = gql`
  mutation CreateLocalWorkspaceMutation(
    $workspaceSetting: CreateWorkspaceSettingInput!
    $panel: CreateLocalPanelInput!
    $panelSetting: CreatePanelSettingInput!
  ) {
    workspace: createLocalWorkspace(
      workspaceSetting: $workspaceSetting
      panel: $panel
      panelSetting: $panelSetting
    ) {
      id
    }
  }
`

const CreateLocalWorkspace = () => {
  const { isAuthenticated } = useAuth()

  const [createLocalWorkspace] = useMutation(CREATE_LOCAL_WORKSPACE_MUTATION, {
    onCompleted: ({ workspace }) => {
      toast.success('Workspace created')

      localStorage.removeItem('syntaxshare.workspaceSettings')
      localStorage.removeItem('syntaxshare.panelDetails')
      localStorage.removeItem('syntaxshare.panelSettings')

      navigate(routes.workspace({ id: workspace.id }))
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  useEffect(() => {
    if (!isAuthenticated) return

    const workspaceSetting = localStorage.getItem(
      'syntaxshare.workspaceSettings'
    )
    const panel = localStorage.getItem('syntaxshare.panelDetails')
    const panelSetting = localStorage.getItem('syntaxshare.panelSettings')

    if (!workspaceSetting && !panel && !panelSetting) return

    createLocalWorkspace({
      variables: {
        workspaceSetting: {
          size: 'square',
          ...JSON.parse(workspaceSetting),
        },
        panel: {
          ...detailDefaults,
          ...JSON.parse(panel),
        },
        panelSetting: {
          ...settingDefaults,
          ...JSON.parse(panelSetting),
        },
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return <></>
}

export default CreateLocalWorkspace
