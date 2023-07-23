import { render } from '@redwoodjs/testing/web'

import LoginPasswordlessForm from './LoginPasswordlessForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LoginPasswordlessForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoginPasswordlessForm />)
    }).not.toThrow()
  })
})
