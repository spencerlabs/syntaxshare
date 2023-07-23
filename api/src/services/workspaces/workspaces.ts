import type {
  QueryResolvers,
  MutationResolvers,
  WorkspaceRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { workspaceSettings } from 'src/lib/defaultSettings'

export const workspaces: QueryResolvers['workspaces'] = () => {
  return db.workspace.findMany({
    where: {
      userId: context.currentUser.id,
    },
  })
}

export const workspace: QueryResolvers['workspace'] = ({ id }) => {
  return db.workspace.findUnique({
    where: { id, userId: context.currentUser.id },
  })
}

export const createWorkspace: MutationResolvers['createWorkspace'] = async ({
  input,
}) => {
  const userSettings = await db.workspaceSetting.findUnique({
    where: {
      userId: context.currentUser.id,
    },
    select: {
      size: true,
      handle: true,
      gradientFrom: true,
    },
  })

  return db.workspace.create({
    data: {
      ...input,
      userId: context.currentUser.id,
      settings: {
        create: userSettings || workspaceSettings,
      },
    },
  })
}

export const updateWorkspace: MutationResolvers['updateWorkspace'] = ({
  id,
  input,
}) => {
  return db.workspace.update({
    data: input,
    where: { id, userId: context.currentUser.id },
  })
}

export const deleteWorkspace: MutationResolvers['deleteWorkspace'] = ({
  id,
}) => {
  return db.workspace.delete({
    where: { id, userId: context.currentUser.id },
  })
}

export const Workspace: WorkspaceRelationResolvers = {
  user: (_obj, { root }) => {
    return db.workspace.findUnique({ where: { id: root?.id } }).user()
  },
  panels: (_obj, { root }) => {
    return db.workspace.findUnique({ where: { id: root?.id } }).panels()
  },
  settings: (_obj, { root }) => {
    return db.workspace.findUnique({ where: { id: root?.id } }).settings()
  },
}
