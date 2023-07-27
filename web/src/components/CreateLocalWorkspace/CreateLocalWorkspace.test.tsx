import { render } from '@redwoodjs/testing/web'

import CreateLocalWorkspace from './CreateLocalWorkspace'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CreateLocalWorkspace', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateLocalWorkspace />)
    }).not.toThrow()
  })
})
