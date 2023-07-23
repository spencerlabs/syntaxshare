export const schema = gql`
  type Workspace {
    id: String!
    title: String!
    user: User!
    userId: String!
    panels: [Panel]!
    settings: WorkspaceSetting
    visibility: Visibility!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum Visibility {
    public
    private
  }

  type Query {
    workspaces: [Workspace!]! @requireAuth
    workspace(id: String!): Workspace @requireAuth
  }

  input CreateWorkspaceInput {
    title: String!
    userId: String!
    visibility: Visibility!
  }

  input UpdateWorkspaceInput {
    title: String
    userId: String
    visibility: Visibility
  }

  type Mutation {
    createWorkspace(input: CreateWorkspaceInput!): Workspace! @requireAuth
    updateWorkspace(id: String!, input: UpdateWorkspaceInput!): Workspace!
      @requireAuth
    deleteWorkspace(id: String!): Workspace! @requireAuth
  }
`
