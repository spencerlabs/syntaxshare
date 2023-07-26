import { render } from '@redwoodjs/testing/web'

import DeleteWorkspaceButton from './DeleteWorkspaceButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DeleteWorkspaceButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DeleteWorkspaceButton />)
    }).not.toThrow()
  })
})
