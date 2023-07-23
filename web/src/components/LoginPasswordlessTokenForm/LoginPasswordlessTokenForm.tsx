import { useEffect } from 'react'

import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { navigate, routes, Link } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

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
    // login expects a username and password for dbauth
    // so we are passing them.
    const response = await logIn({ username: email, password: data.loginToken })
    if (response.error) {
      toast.error(response.error)
    }
  }

  return (
    <>
      <MetaTags title="Login" />
      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">
                Login with Token
              </h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <Label
                    name="email"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Email
                  </Label>
                  <TextField
                    name="email"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    readOnly={true}
                    defaultValue={email}
                  />

                  <FieldError name="email" className="rw-field-error" />
                  <Label
                    name="loginToken"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Token
                  </Label>
                  <TextField
                    name="loginToken"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                  />

                  <FieldError name="loginToken" className="rw-field-error" />
                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">Login</Submit>
                  </div>
                  <div className="rw-button-group">
                    <button
                      className="rw-button rw-button-blue"
                      onClick={() => {
                        setWaitingForCode(false)
                      }}
                    >
                      Get another Token
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <span>Don&apos;t have an account?</span>{' '}
            <Link to={routes.signup()} className="rw-link">
              Sign up!
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPasswordlessTokenForm
