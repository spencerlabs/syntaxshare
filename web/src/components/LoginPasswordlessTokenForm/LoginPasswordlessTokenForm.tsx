import { useEffect } from 'react'

import {
  Form,
  Label,
  EmailField,
  TextField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { RouteFocus, navigate, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const LoginPasswordlessTokenForm = ({ setWaitingForCode, email, code }) => {
  const { isAuthenticated, logIn } = useAuth()
  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
    if (email && code) {
      console.log('email', email)
      logIn({ username: email, password: code })
    }
  }, [isAuthenticated, email, code, logIn])
  const onSubmit = async (data) => {
    // login expects a username and password for dbAuth
    // so we are passing them.
    const response = await logIn({ username: email, password: data.loginToken })
    if (response.error) {
      toast.error(response.error)
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <Label
        name="email"
        className="font-mono text-xs font-semibold uppercase text-stone-300"
        errorClassName="text-xs font-mono font-semibold uppercase text-red-300"
      >
        Email
      </Label>

      <EmailField
        name="email"
        className="w-full rounded-md bg-stone-900 px-2 py-1 text-lg"
        readOnly={true}
        defaultValue={email}
      />

      <FieldError name="email" className="text-red-300" />

      <Label
        name="loginToken"
        className="font-mono text-xs font-semibold uppercase text-stone-300"
        errorClassName="text-xs font-mono font-semibold uppercase text-red-300"
      >
        Token
      </Label>

      <RouteFocus>
        <TextField
          name="loginToken"
          className="w-full rounded-md bg-stone-900 px-2 py-1 text-lg"
        />
      </RouteFocus>

      <FieldError name="loginToken" className="text-red-300" />

      <div className="mt-4 flex items-center justify-center">
        <Submit className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-stone-900 transition-colors hover:bg-emerald-600">
          Log In
        </Submit>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <button
          className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-stone-900 transition-colors hover:bg-emerald-600"
          onClick={() => {
            setWaitingForCode(false)
          }}
        >
          Get another Token
        </button>
      </div>
    </Form>
  )
}

export default LoginPasswordlessTokenForm
