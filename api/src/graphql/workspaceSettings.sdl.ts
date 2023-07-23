export const schema = gql`
  type WorkspaceSetting {
    id: String!
    workspace: Workspace
    workspaceId: String
    user: User
    userId: String
    size: String!
    handle: String!
    gradientFrom: String!
    gradientTo: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    workspaceSettings: [WorkspaceSetting!]! @requireAuth
    workspaceSetting(id: String!): WorkspaceSetting @requireAuth
  }

  input CreateWorkspaceSettingInput {
    workspaceId: String
    userId: String
    size: String!
    handle: String!
    gradientFrom: String!
    gradientTo: String
  }

  input UpdateWorkspaceSettingInput {
    workspaceId: String
    userId: String
    size: String
    handle: String
    gradientFrom: String
    gradientTo: String
  }

  type Mutation {
    createWorkspaceSetting(
      input: CreateWorkspaceSettingInput!
    ): WorkspaceSetting! @requireAuth
    updateWorkspaceSetting(
      id: String!
      input: UpdateWorkspaceSettingInput!
    ): WorkspaceSetting! @requireAuth
    deleteWorkspaceSetting(id: String!): WorkspaceSetting! @requireAuth
  }
`
