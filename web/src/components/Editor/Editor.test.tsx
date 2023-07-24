import { render } from '@redwoodjs/testing/web'

import Editor from './Editor'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Editor', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Editor />)
    }).not.toThrow()
  })
})
