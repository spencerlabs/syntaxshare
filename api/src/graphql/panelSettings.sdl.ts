export const schema = gql`
  type PanelSetting {
    id: String!
    panel: Panel
    panelId: String
    user: User
    userId: String
    language: String!
    code: String!
    codeSize: String!
    gradientFrom: String!
    gradientTo: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    panelSettings: [PanelSetting!]! @requireAuth
    panelSetting(id: String!): PanelSetting @requireAuth
  }

  input CreatePanelSettingInput {
    panelId: String
    userId: String
    language: String!
    code: String!
    codeSize: String!
    gradientFrom: String!
    gradientTo: String
  }

  input UpdatePanelSettingInput {
    panelId: String
    userId: String
    language: String
    code: String
    codeSize: String
    gradientFrom: String
    gradientTo: String
  }

  type Mutation {
    createPanelSetting(input: CreatePanelSettingInput!): PanelSetting!
      @requireAuth
    updatePanelSetting(
      id: String!
      input: UpdatePanelSettingInput!
    ): PanelSetting! @requireAuth
    deletePanelSetting(id: String!): PanelSetting! @requireAuth
  }
`
