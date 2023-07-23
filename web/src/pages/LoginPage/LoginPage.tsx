import { useEffect, useState } from 'react'

import { useLocation } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import LoginPasswordlessForm from 'src/components/LoginPasswordlessForm/LoginPasswordlessForm'
import LoginPasswordlessTokenForm from 'src/components/LoginPasswordlessTokenForm/LoginPasswordlessTokenForm'

const LoginPage = () => {
  const [waitingForCode, setWaitingForCode] = useState(false)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
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

  return (
    <>
      <MetaTags
        title="LoginPasswordless"
        description="LoginPasswordless page"
      />

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
    </>
  )
}

export default LoginPage
