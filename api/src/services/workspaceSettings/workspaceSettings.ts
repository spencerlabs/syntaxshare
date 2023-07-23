import type {
  QueryResolvers,
  MutationResolvers,
  WorkspaceSettingRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const workspaceSetting: QueryResolvers['workspaceSetting'] = ({
  id,
}) => {
  return db.workspaceSetting.findUnique({
    where: {
      id,
      workspace: {
        userId: context.currentUser.id,
      },
    },
  })
}

export const userWorkspaceSetting: QueryResolvers['userWorkspaceSetting'] =
  () => {
    return db.workspaceSetting.findUnique({
      where: {
        userId: context.currentUser.id,
      },
    })
  }

export const updateWorkspaceSetting: MutationResolvers['updateWorkspaceSetting'] =
  ({ id, input }) => {
    const userId = context.currentUser.id

    return db.workspaceSetting.update({
      data: input,
      where: {
        id,
        OR: [
          { userId },
          {
            workspace: {
              userId,
            },
          },
        ],
      },
    })
  }

export const WorkspaceSetting: WorkspaceSettingRelationResolvers = {
  workspace: (_obj, { root }) => {
    return db.workspaceSetting
      .findUnique({ where: { id: root?.id } })
      .workspace()
  },
  user: (_obj, { root }) => {
    return db.workspaceSetting.findUnique({ where: { id: root?.id } }).user()
  },
}
