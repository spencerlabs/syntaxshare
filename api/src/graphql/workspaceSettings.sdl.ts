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
    workspaceSetting(id: String!): WorkspaceSetting @requireAuth
    userWorkspaceSetting: WorkspaceSetting @requireAuth
  }

  input CreateWorkspaceSettingInput {
    size: String
    handle: String
    gradientFrom: String
    gradientTo: String
  }

  input UpdateWorkspaceSettingInput {
    size: String
    handle: String
    gradientFrom: String
    gradientTo: String
  }

  type Mutation {
    updateWorkspaceSetting(
      id: String!
      input: UpdateWorkspaceSettingInput!
    ): WorkspaceSetting! @requireAuth
  }
`
