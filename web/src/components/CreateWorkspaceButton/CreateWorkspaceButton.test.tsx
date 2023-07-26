import { render } from '@redwoodjs/testing/web'

import CreateWorkspaceButton from './CreateWorkspaceButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CreateWorkspaceButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateWorkspaceButton />)
    }).not.toThrow()
  })
})
