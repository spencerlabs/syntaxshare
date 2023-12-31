import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { email: 'String7468351' } },
    two: { data: { email: 'String9221848' } },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
