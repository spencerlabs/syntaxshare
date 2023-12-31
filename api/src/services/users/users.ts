import CryptoJS from 'crypto-js'
import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { UserInputError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'

export const user: QueryResolvers['user'] = () => {
  return db.user.findUnique({
    where: { id: context.currentUser.id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = () => {
  return db.user.delete({
    where: { id: context.currentUser.id },
  })
}

export const generateToken = async ({ email }) => {
  function sendTokenEmail(emailAddress: string, token: string) {
    const subject = 'Login token'
    const text = `Your login token is: ${token}`
    const html = `Your login token is: <strong>${token}</strong>`
    return sendEmail({ to: emailAddress, subject, text, html })
  }

  try {
    // look up if the user exists
    const lookupUser = await db.user.findFirst({ where: { email } })

    if (!lookupUser) return { message: 'Login Request received' }

    // here we're going to generate a random password of 6 numbers
    const randomNumber = (() => {
      const random = CryptoJS.lib.WordArray.random(6)
      const randomString = random.toString()
      let sixDigitNumber = randomString.replace(/\D/g, '')
      if (sixDigitNumber.length < 6) {
        sixDigitNumber = sixDigitNumber.padStart(6, '0')
      }
      if (sixDigitNumber.length > 6) {
        sixDigitNumber = sixDigitNumber.slice(0, 6)
      }
      return sixDigitNumber.toString()
    })()

    await sendTokenEmail(email, randomNumber)

    const salt = CryptoJS.lib.WordArray.random(30).toString()

    const loginToken = CryptoJS.PBKDF2(randomNumber, salt, {
      keySize: 256 / 32,
    }).toString()

    // now we'll update the user with the new salt and loginToken
    const loginTokenExpiresAt = new Date()

    loginTokenExpiresAt.setMinutes(loginTokenExpiresAt.getMinutes() + 15)

    const data = {
      salt,
      loginToken,
      loginTokenExpiresAt,
    }
    await db.user.update({
      where: { id: lookupUser.id },
      data,
    })

    return { message: 'Login Request received' }
  } catch (error) {
    console.log({ error })
    throw new UserInputError(error.message)
  }
}

export const User: UserRelationResolvers = {
  workspaces: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).workspaces()
  },
  workspaceSettings: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).workspaceSettings()
  },
  panelSettings: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).panelSettings()
  },
}
