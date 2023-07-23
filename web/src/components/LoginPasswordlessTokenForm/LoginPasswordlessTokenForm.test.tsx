import { render } from '@redwoodjs/testing/web'

import LoginPasswordlessTokenForm from './LoginPasswordlessTokenForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LoginPasswordlessTokenForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoginPasswordlessTokenForm />)
    }).not.toThrow()
  })
})
