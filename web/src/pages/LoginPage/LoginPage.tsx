import { useEffect, useState } from 'react'

import { Link, navigate, routes, useLocation } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import LoginPasswordlessForm from 'src/components/LoginPasswordlessForm/LoginPasswordlessForm'
import LoginPasswordlessTokenForm from 'src/components/LoginPasswordlessTokenForm/LoginPasswordlessTokenForm'

const LoginPage = () => {
  const [waitingForCode, setWaitingForCode] = useState(false)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')

  const { isAuthenticated } = useAuth()

  // onload set email from query string
  const { search } = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(search)
    // decode magic param
    const magic = params.get('magic')
    const decoded = window.atob(params.get('magic'))
    // if magic param exists, set email and waitingForCode
    if (magic) {
      // decoded is email:code
      const [email, code] = decoded.split(':')
      setEmail(email)
      setCode(code)
      setWaitingForCode(true)
    }
  }, [search])

  useEffect(() => {
    if (isAuthenticated) navigate(routes.home())
  }, [isAuthenticated])

  return (
    <div className="mx-auto max-w-sm">
      <MetaTags title="Login" />

      <header className="mb-4 text-center">
        <h1>Log In</h1>
      </header>

      <div className="block rounded-md bg-stone-700 p-4">
        {!waitingForCode && (
          <LoginPasswordlessForm
            setWaitingForCode={setWaitingForCode}
            setEmail={setEmail}
          />
        )}
        {waitingForCode && (
          <LoginPasswordlessTokenForm
            email={email}
            setWaitingForCode={setWaitingForCode}
            code={code}
          />
        )}

        <a
          href={`https://github.com/login/oauth/authorize?client_id=${
            process.env.GITHUB_OAUTH_CLIENT_ID
          }&redirect_uri=${
            process.env.GITHUB_OAUTH_REDIRECT_URI
          }&scope=${process.env.GITHUB_OAUTH_SCOPES.split(' ').join('+')}`}
          className="mx-auto block w-48 rounded bg-gray-800 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white"
        >
          Log in with GitHub
        </a>
      </div>

      <p className="mt-2 text-center text-sm">
        <span>{"Don't have an account?"}</span>{' '}
        <Link
          to={routes.signup()}
          className="font-semibold text-emerald-500 hover:text-emerald-400"
        >
          Sign up!
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
