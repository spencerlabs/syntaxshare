import type {
  QueryResolvers,
  MutationResolvers,
  WorkspaceRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { workspaceSettings, panelSettings } from 'src/lib/defaultSettings'

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export const workspaces: QueryResolvers['workspaces'] = () => {
  return db.workspace.findMany({
    where: {
      userId: context.currentUser.id,
    },
    orderBy: {
      updatedAt: 'desc',
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
      gradientTo: true,
    },
  })

  const customAlphabet = await import('nanoid').then(
    ({ customAlphabet }) => customAlphabet
  )
  const nanoId = customAlphabet(alphabet, 10)

  const id = nanoId()

  return db.workspace.create({
    data: {
      ...input,
      id,
      userId: context.currentUser.id,
      settings: {
        create: userSettings || workspaceSettings,
      },
      panels: {
        create: {
          code: '',
          settings: {
            create: {
              ...panelSettings,
              gradientFrom:
                userSettings?.gradientFrom || panelSettings.gradientFrom,
            },
          },
        },
      },
    },
  })
}

export const createLocalWorkspace: MutationResolvers['createLocalWorkspace'] =
  async ({ workspaceSetting, panel, panelSetting }) => {
    const customAlphabet = await import('nanoid').then(
      ({ customAlphabet }) => customAlphabet
    )
    const nanoId = customAlphabet(alphabet, 10)

    const id = nanoId()

    return db.workspace.create({
      data: {
        id,
        title: 'Untitled',
        userId: context.currentUser.id,
        settings: {
          create: { ...workspaceSettings, ...workspaceSetting },
        },
        panels: {
          create: {
            title: '',
            code: '',
            ...panel,
            settings: {
              create: { ...panelSettings, ...panelSetting },
            },
          },
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
    return db.workspace.findUnique({ where: { id: root?.id } }).panels({
      orderBy: {
        createdAt: 'asc',
      },
    })
  },
  settings: (_obj, { root }) => {
    return db.workspace.findUnique({ where: { id: root?.id } }).settings()
  },
}
