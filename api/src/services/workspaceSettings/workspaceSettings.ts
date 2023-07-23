import type {
  QueryResolvers,
  MutationResolvers,
  WorkspaceSettingRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const workspaceSettings: QueryResolvers['workspaceSettings'] = () => {
  return db.workspaceSetting.findMany()
}

export const workspaceSetting: QueryResolvers['workspaceSetting'] = ({
  id,
}) => {
  return db.workspaceSetting.findUnique({
    where: { id },
  })
}

export const createWorkspaceSetting: MutationResolvers['createWorkspaceSetting'] =
  ({ input }) => {
    return db.workspaceSetting.create({
      data: input,
    })
  }

export const updateWorkspaceSetting: MutationResolvers['updateWorkspaceSetting'] =
  ({ id, input }) => {
    return db.workspaceSetting.update({
      data: input,
      where: { id },
    })
  }

export const deleteWorkspaceSetting: MutationResolvers['deleteWorkspaceSetting'] =
  ({ id }) => {
    return db.workspaceSetting.delete({
      where: { id },
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
