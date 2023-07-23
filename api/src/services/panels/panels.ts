import type {
  QueryResolvers,
  MutationResolvers,
  PanelRelationResolvers,
} from 'types/graphql'

import { AuthenticationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { panelSettings } from 'src/lib/defaultSettings'

export const panels: QueryResolvers['panels'] = ({ workspaceId }) => {
  return db.panel.findMany({
    where: {
      workspaceId,
      workspace: {
        userId: context.currentUser.id,
      },
    },
  })
}

export const panel: QueryResolvers['panel'] = ({ id }) => {
  return db.panel.findUnique({
    where: {
      id,
      workspace: {
        userId: context.currentUser.id,
      },
    },
  })
}

export const createPanel: MutationResolvers['createPanel'] = async ({
  input,
}) => {
  const workspace = await db.workspace.findUnique({
    where: {
      id: input.workspaceId,
      userId: context.currentUser.id,
    },
    select: {
      settings: {
        select: {
          gradientFrom: true,
        },
      },
    },
  })

  if (!workspace) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  const userSettings = await db.panelSetting.findUnique({
    where: {
      userId: context.currentUser.id,
    },
    select: {
      language: true,
      codeSize: true,
      gradientFrom: true,
    },
  })

  return db.panel.create({
    data: {
      ...input,
      code: '',
      settings: {
        create:
          userSettings && workspace?.settings?.gradientFrom
            ? {
                ...userSettings,
                gradientFrom: workspace.settings.gradientFrom,
              }
            : panelSettings,
      },
    },
  })
}

export const updatePanel: MutationResolvers['updatePanel'] = ({
  id,
  input,
}) => {
  return db.panel.update({
    data: input,
    where: {
      id,
      workspace: {
        userId: context.currentUser.id,
      },
    },
  })
}

export const deletePanel: MutationResolvers['deletePanel'] = ({ id }) => {
  return db.panel.delete({
    where: {
      id,
      workspace: {
        userId: context.currentUser.id,
      },
    },
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
