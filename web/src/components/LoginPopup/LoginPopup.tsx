import { useState } from 'react'

import { Form, Label, FieldError, EmailField, Submit } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import Modal from 'src/components/Modal'

interface LoginPopupProps {
  isOpen: boolean
  notification?: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginPopup = ({ notification, isOpen, setIsOpen }: LoginPopupProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { logIn } = useAuth()

  const onSubmit = async (data: { email: string }) => {
    setIsLoading(true)

    const { error } = await logIn({
      email: data.email,
      authMethod: 'otp',
      options: {
        emailRedirectTo: window.location.origin,
      },
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Log in link emailed!')
    }

    setIsLoading(false)
  }

  return (
    <Modal title="Log In or Sign Up" isOpen={isOpen} setIsOpen={setIsOpen}>
      {notification && (
        <div className="mb-6 space-y-2 text-xs">
          <p>{notification}</p>
          <p>Create a free account or log in!</p>
        </div>
      )}

      <div className="grid gap-3">
        <button
          className="rounded-md bg-stone-800 p-2 text-sm font-semibold"
          onClick={() =>
            logIn({
              provider: 'github',
              authMethod: 'oauth',
              options: {
                redirectTo: window.location.origin,
              },
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
          className="text-xs font-semibold uppercase text-stone-300"
          errorClassName="text-xs font-semibold uppercase text-red-300"
        >
          Email
        </Label>

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
    </Modal>
  )
}

export default LoginPopup
