import type { APIGatewayEvent, Context } from 'aws-lambda'
import CryptoJS from 'crypto-js'

import { db } from 'src/lib/db'

export const handler = async (event: APIGatewayEvent, _context: Context) => {
  switch (event.path) {
    case '/oauth/github/callback':
      return await callback(event)
    default:
      // Whatever this is, it's not correct, so return "Not Found"
      return {
        statusCode: 404,
      }
  }
}

const callback = async (event: APIGatewayEvent) => {
  const { code } = event.queryStringParameters

  const response = await fetch(`https://github.com/login/oauth/access_token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      redirect_uri: process.env.GITHUB_OAUTH_REDIRECT_URI,
      code,
    }),
  })

  const { access_token, scope, error } = JSON.parse(await response.text())

  if (error) {
    return { statuscode: 400, body: error }
  }

  try {
    const providerUser = await getProviderUser(access_token)
    const user = await getUser({
      providerUser,
      accessToken: access_token,
      scope,
    })
    const cookie = secureCookie(user)

    return {
      statusCode: 302,
      headers: {
        'Set-Cookie': cookie,
        Location: '/',
      },
    }
  } catch (e) {
    return { statuscode: 500, body: e.message }
  }
}

const secureCookie = (user) => {
  const expires = new Date()
  expires.setFullYear(expires.getFullYear() + 1)

  const cookieAttrs = [
    `Expires=${expires.toUTCString()}`,
    'HttpOnly=true',
    'Path=/',
    'SameSite=Strict',
    `Secure=${process.env.NODE_ENV !== 'development'}`,
  ]
  const data = JSON.stringify({ id: user.id })

  const encrypted = CryptoJS.AES.encrypt(
    data,
    process.env.SESSION_SECRET
  ).toString()

  return [`session=${encrypted}`, ...cookieAttrs].join('; ')
}

const getProviderUser = async (token: string) => {
  const response = await fetch('https://api.github.com/user', {
    headers: { Authorization: `Bearer ${token}` },
  })
  const body = JSON.parse(await response.text())

  return body
}

const getUser = async ({ providerUser, accessToken, scope }) => {
  const { user, identity } = await findOrCreateUser(providerUser)

  await db.identity.update({
    where: { id: identity.id },
    data: { accessToken, scope, lastLoginAt: new Date() },
  })

  return user
}

const findOrCreateUser = async (providerUser) => {
  const identity = await db.identity.findFirst({
    where: { provider: 'github', uid: providerUser.id.toString() },
  })

  if (identity) {
    // identity exists, return the user
    const user = await db.user.findUnique({ where: { id: identity.userId } })
    return { user, identity }
  }

  // identity not found, need to create it and the user
  return await db.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: providerUser.email,
      },
    })

    const identity = await tx.identity.create({
      data: {
        userId: user.id,
        provider: 'github',
        uid: providerUser.id.toString(),
      },
    })

    return { user, identity }
  })
}
