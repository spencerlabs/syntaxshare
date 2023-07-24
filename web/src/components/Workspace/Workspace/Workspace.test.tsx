import { render } from '@redwoodjs/testing/web'

import Workspace from './Workspace'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Workspace', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Workspace />)
    }).not.toThrow()
  })
})
