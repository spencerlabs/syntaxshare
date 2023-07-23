import type {
  QueryResolvers,
  MutationResolvers,
  PanelSettingRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const panelSetting: QueryResolvers['panelSetting'] = ({ id }) => {
  return db.panelSetting.findUnique({
    where: {
      id,
      panel: {
        workspace: {
          userId: context.currentUser.id,
        },
      },
    },
  })
}

export const userPanelSetting: QueryResolvers['userPanelSetting'] = () => {
  return db.panelSetting.findUnique({
    where: { userId: context.currentUser.id },
  })
}

export const updatePanelSetting: MutationResolvers['updatePanelSetting'] = ({
  id,
  input,
}) => {
  const userId = context.currentUser.id

  return db.panelSetting.update({
    data: input,
    where: {
      id,
      OR: [
        { userId },
        {
          panel: {
            workspace: {
              userId,
            },
          },
        },
      ],
    },
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
