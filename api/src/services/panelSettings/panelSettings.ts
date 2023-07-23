import type {
  QueryResolvers,
  MutationResolvers,
  PanelSettingRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const panelSettings: QueryResolvers['panelSettings'] = () => {
  return db.panelSetting.findMany()
}

export const panelSetting: QueryResolvers['panelSetting'] = ({ id }) => {
  return db.panelSetting.findUnique({
    where: { id },
  })
}

export const createPanelSetting: MutationResolvers['createPanelSetting'] = ({
  input,
}) => {
  return db.panelSetting.create({
    data: input,
  })
}

export const updatePanelSetting: MutationResolvers['updatePanelSetting'] = ({
  id,
  input,
}) => {
  return db.panelSetting.update({
    data: input,
    where: { id },
  })
}

export const deletePanelSetting: MutationResolvers['deletePanelSetting'] = ({
  id,
}) => {
  return db.panelSetting.delete({
    where: { id },
  })
}

export const PanelSetting: PanelSettingRelationResolvers = {
  panel: (_obj, { root }) => {
    return db.panelSetting.findUnique({ where: { id: root?.id } }).panel()
  },
  user: (_obj, { root }) => {
    return db.panelSetting.findUnique({ where: { id: root?.id } }).user()
  },
}
