export const schema = gql`
  type User {
    id: String!
    email: String!
    workspaces: [Workspace]!
    workspaceSettings: WorkspaceSetting
    panelSettings: PanelSetting
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    user: User @requireAuth
  }

  type UserTokenResponse {
    message: String!
  }

  type Mutation {
    deleteUser: User! @requireAuth
    generateToken(email: String!): UserTokenResponse! @skipAuth
  }
`
