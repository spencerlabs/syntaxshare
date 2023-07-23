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
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
  }

  input UpdateUserInput {
    email: String
  }

  type UserTokenResponse {
    message: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
    generateToken(email: String!): UserTokenResponse! @skipAuth
  }
`
