import { render } from '@redwoodjs/testing/web'

import WorkspacesPage from './WorkspacesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('WorkspacesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WorkspacesPage />)
    }).not.toThrow()
  })
})
