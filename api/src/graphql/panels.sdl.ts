export const schema = gql`
  type Panel {
    id: String!
    title: String
    workspace: Workspace!
    workspaceId: String!
    settings: PanelSetting
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    panels: [Panel!]! @requireAuth
    panel(id: String!): Panel @requireAuth
  }

  input CreatePanelInput {
    title: String
    workspaceId: String!
  }

  input UpdatePanelInput {
    title: String
    workspaceId: String
  }

  type Mutation {
    createPanel(input: CreatePanelInput!): Panel! @requireAuth
    updatePanel(id: String!, input: UpdatePanelInput!): Panel! @requireAuth
    deletePanel(id: String!): Panel! @requireAuth
  }
`
