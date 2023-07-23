import type {
  QueryResolvers,
  MutationResolvers,
  PanelRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const panels: QueryResolvers['panels'] = () => {
  return db.panel.findMany()
}

export const panel: QueryResolvers['panel'] = ({ id }) => {
  return db.panel.findUnique({
    where: { id },
  })
}

export const createPanel: MutationResolvers['createPanel'] = ({ input }) => {
  return db.panel.create({
    data: input,
  })
}

export const updatePanel: MutationResolvers['updatePanel'] = ({
  id,
  input,
}) => {
  return db.panel.update({
    data: input,
    where: { id },
  })
}

export const deletePanel: MutationResolvers['deletePanel'] = ({ id }) => {
  return db.panel.delete({
    where: { id },
  })
}

export const Panel: PanelRelationResolvers = {
  workspace: (_obj, { root }) => {
    return db.panel.findUnique({ where: { id: root?.id } }).workspace()
  },
  settings: (_obj, { root }) => {
    return db.panel.findUnique({ where: { id: root?.id } }).settings()
  },
}
