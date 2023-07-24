import { render } from '@redwoodjs/testing/web'

import WorkspacePage from './WorkspacePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('WorkspacePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WorkspacePage id={'42'} />)
    }).not.toThrow()
  })
})
