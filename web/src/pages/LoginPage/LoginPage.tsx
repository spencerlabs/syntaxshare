import { useEffect, useState } from 'react'

import { Form, EmailField, Label, Submit, FieldError } from '@redwoodjs/forms'
import { RouteFocus, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate(routes.home())
  }, [isAuthenticated])

  const onSubmit = async (data: { email: string }) => {
    setIsLoading(true)

    const { error } = await logIn({
      email: data.email,
      authMethod: 'otp',
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Log in link emailed!')
    }

    setIsLoading(false)
  }

  return (
    <div className="mx-auto max-w-sm">
      <MetaTags title="Login" />

      <header className="mb-4 text-center">
        <h1>Log In or Sign Up</h1>
      </header>

      <div className="block rounded-md bg-stone-700 p-4">
        <div className="grid gap-3">
          <button
            className="rounded-md bg-stone-800 p-2 text-sm font-semibold"
            onClick={() =>
              logIn({
                provider: 'github',
                authMethod: 'oauth',
              })
            }
          >
            Log in with GitHub
          </button>
        </div>

        <hr className="my-6 border-stone-500" />

        <Form onSubmit={onSubmit} className="-mt-2">
          <Label
            name="email"
            className="font-mono text-xs font-semibold uppercase text-stone-300"
            errorClassName="text-xs font-mono font-semibold uppercase text-red-300"
          >
            Email
          </Label>

          <RouteFocus>
            <EmailField
              name="email"
              className="w-full rounded-md bg-stone-900 px-2 py-1 text-lg"
              validation={{
                required: {
                  value: true,
                  message: 'Email is required',
                },
              }}
            />
          </RouteFocus>

          <FieldError name="email" className="text-red-300" />

          <div className="mt-4 flex items-center justify-center">
            <Submit
              disabled={isLoading}
              className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-stone-900 transition-colors hover:bg-emerald-600"
            >
              Send login link
            </Submit>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage
