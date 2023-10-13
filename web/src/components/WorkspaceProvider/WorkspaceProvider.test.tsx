import { render } from '@redwoodjs/testing/web'

import WorkspaceProvider from './WorkspaceProvider'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WorkspaceProvider', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WorkspaceProvider />)
    }).not.toThrow()
  })
})
