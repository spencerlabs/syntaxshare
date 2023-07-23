export const schema = gql`
  type PanelSetting {
    id: String!
    panel: Panel
    panelId: String
    user: User
    userId: String
    language: String!
    codeSize: String!
    gradientFrom: String!
    gradientTo: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    panelSetting(id: String!): PanelSetting @requireAuth
    userPanelSetting: PanelSetting @requireAuth
  }

  input UpdatePanelSettingInput {
    language: String
    codeSize: String
    gradientFrom: String
    gradientTo: String
  }

  type Mutation {
    updatePanelSetting(
      id: String!
      input: UpdatePanelSettingInput!
    ): PanelSetting! @requireAuth
  }
`
