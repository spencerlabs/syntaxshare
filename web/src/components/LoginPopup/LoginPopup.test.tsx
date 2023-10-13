import { render } from '@redwoodjs/testing/web'

import LoginPopup from './LoginPopup'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LoginPopup', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoginPopup />)
    }).not.toThrow()
  })
})
