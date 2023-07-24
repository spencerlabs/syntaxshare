import { Form, Label, EmailField, Submit, FieldError } from '@redwoodjs/forms'
import { RouteFocus } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const GENERATE_LOGIN_TOKEN = gql`
  mutation generateToken($email: String!) {
    generateToken(email: $email) {
      message
    }
  }
`

const LoginPasswordlessForm = ({ setWaitingForCode, setEmail }) => {
  const [generateToken] = useMutation(GENERATE_LOGIN_TOKEN, {
    onCompleted: () => {
      toast.success('Check your email for a login link')
      setWaitingForCode(true)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const onSubmit = async (data: { email: string }) => {
    setEmail(data.email)
    generateToken({
      variables: { email: data.email },
      fetchPolicy: 'no-cache',
    })
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
        <Submit className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-stone-900 transition-colors hover:bg-emerald-600">
          Send Token
        </Submit>
      </div>
    </Form>
  )
}

export default LoginPasswordlessForm
