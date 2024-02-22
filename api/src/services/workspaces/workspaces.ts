import { customAlphabet } from 'nanoid'
import type {
  QueryResolvers,
  MutationResolvers,
  WorkspaceRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { workspaceSettings, panelSettings } from 'src/lib/defaultSettings'

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const nanoId = customAlphabet(alphabet, 10)

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

export const duplicateWorkspace: MutationResolvers['duplicateWorkspace'] =
  async ({ id }) => {
    const userId = context.currentUser.id

    const workspace = await db.workspace.findUnique({
      where: { id, userId },
      select: {
        title: true,
        visibility: true,
        settings: {
          select: {
            size: true,
            handle: true,
            gradientFrom: true,
            gradientTo: true,
          },
        },
        panels: {
          select: {
            title: true,
            code: true,
            settings: {
              select: {
                language: true,
                codeSize: true,
                gradientFrom: true,
                gradientTo: true,
              },
            },
          },
        },
      },
    })

    if (!workspace) {
      throw Error(
        'This workspace does not exist or you do not have access to it.'
      )
    }

    const { title, panels, settings, ...rest } = workspace

    const newId = nanoId()

    const newWorkspace = await db.workspace.create({
      data: {
        ...rest,
        id: newId,
        title: `${title} (copy)`,
        userId,
        settings: {
          create: {
            ...settings,
          },
        },
      },
    })

    try {
      for (let i = 0; i < panels.length; i++) {
        const panel = panels[i]

        const { settings: panelSettings, ...rest } = panel

        await db.panel.create({
          data: {
            ...rest,
            workspaceId: newWorkspace.id,
            settings: {
              create: {
                ...panelSettings,
              },
            },
          },
        })
      }
    } catch (err) {
      await db.workspace.delete({
        where: { id: newWorkspace.id },
      })

      throw Error(err)
    }

    return db.workspace.findUnique({
      where: { id: newWorkspace.id },
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
