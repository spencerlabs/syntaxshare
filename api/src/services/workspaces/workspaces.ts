import type {
  QueryResolvers,
  MutationResolvers,
  WorkspaceRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const workspaces: QueryResolvers['workspaces'] = () => {
  return db.workspace.findMany()
}

export const workspace: QueryResolvers['workspace'] = ({ id }) => {
  return db.workspace.findUnique({
    where: { id },
  })
}

export const createWorkspace: MutationResolvers['createWorkspace'] = ({
  input,
}) => {
  return db.workspace.create({
    data: input,
  })
}

export const updateWorkspace: MutationResolvers['updateWorkspace'] = ({
  id,
  input,
}) => {
  return db.workspace.update({
    data: input,
    where: { id },
  })
}

export const deleteWorkspace: MutationResolvers['deleteWorkspace'] = ({
  id,
}) => {
  return db.workspace.delete({
    where: { id },
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
