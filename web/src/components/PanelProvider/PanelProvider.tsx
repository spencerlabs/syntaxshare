import { createContext, useContext, useState } from 'react'

import type { FindPanelQuery, FindPanelQueryVariables } from 'types/graphql'

import type { CellSuccessProps } from '@redwoodjs/web'

import { gradients } from 'src/lib/colors'

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

interface PanelProviderProps {
  children?: React.ReactNode
  panel?: CellSuccessProps<FindPanelQuery, FindPanelQueryVariables>['panel']
}

const PanelProvider = ({ children, panel }: PanelProviderProps) => {
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

  return (
    <PanelContext.Provider
      value={{ panelDetails, setPanelDetails, panelSettings, setPanelSettings }}
    >
      {children}
    </PanelContext.Provider>
  )
}

export const usePanel = () => {
  return useContext(PanelContext)
}

export default PanelProvider
