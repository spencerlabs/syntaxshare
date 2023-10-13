import { createContext, useContext, useState } from 'react'

import type {
  FindWorkspaceQuery,
  FindWorkspaceQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps } from '@redwoodjs/web'

type WorkspaceSettings = {
  [x: string]: unknown
  size: string
}

interface IWorkspaceContext {
  workspaceSettings: WorkspaceSettings
  setWorkspaceSettings: React.Dispatch<React.SetStateAction<WorkspaceSettings>>
}

const WorkspaceContext = createContext<IWorkspaceContext>({
  workspaceSettings: { size: 'square' },
  setWorkspaceSettings: () => {},
})

interface WorkspaceProviderProps {
  children?: React.ReactNode
  workspace?: CellSuccessProps<
    FindWorkspaceQuery,
    FindWorkspaceQueryVariables
  >['workspace']
}

const WorkspaceProvider = ({ children, workspace }: WorkspaceProviderProps) => {
  const defaults = workspace?.settings
    ? { size: workspace.settings.size }
    : { size: 'square' }

  const [workspaceSettings, setWorkspaceSettings] =
    useState<WorkspaceSettings>(defaults)

  return (
    <WorkspaceContext.Provider
      value={{ workspaceSettings, setWorkspaceSettings }}
    >
      {children}
    </WorkspaceContext.Provider>
  )
}

export const useWorkspace = () => {
  return useContext(WorkspaceContext)
}

export default WorkspaceProvider
