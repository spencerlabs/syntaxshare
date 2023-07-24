import { useEffect } from 'react'

import { Form, Label, TextField, FieldError, Submit } from '@redwoodjs/forms'
import { Link, RouteFocus, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  const randomString = (length?: number) => {
    if (!length) length = 32

    let result = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    return result
  }

  useEffect(() => {
    if (isAuthenticated) navigate(routes.home())
  }, [isAuthenticated])

  const onSubmit = async (data: { email: string }) => {
    const response = await signUp({
      username: data.email,
      password: randomString(), // this is a random string and is not important
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <div className="mx-auto max-w-sm">
      <MetaTags title="Sign Up" />

      <header className="mb-4 text-center">
        <h1>Sign Up</h1>
      </header>

      <div className="block rounded-md bg-stone-700 p-4">
        <Form onSubmit={onSubmit}>
          <Label
            name="email"
            className="font-mono text-xs font-semibold uppercase text-stone-300"
            errorClassName="text-xs font-mono font-semibold uppercase text-red-300"
          >
            Email
          </Label>

          <RouteFocus>
            <TextField
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
            <Submit className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-stone-900 transition-colors hover:bg-emerald-600">
              Sign Up
            </Submit>
          </div>
        </Form>
      </div>

      <p className="mt-2 text-center text-sm">
        <span>Already have an account?</span>{' '}
        <Link
          to={routes.login()}
          className="font-semibold text-emerald-500 hover:text-emerald-400"
        >
          Log in!
        </Link>
      </p>
    </div>
  )
}

export default SignupPage
