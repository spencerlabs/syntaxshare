import { render } from '@redwoodjs/testing/web'

import WorkspaceMenu from './WorkspaceMenu'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WorkspaceMenu', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WorkspaceMenu />)
    }).not.toThrow()
  })
})
