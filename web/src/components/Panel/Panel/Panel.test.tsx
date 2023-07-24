import { render } from '@redwoodjs/testing/web'

import Panel from './Panel'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Panel', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Panel />)
    }).not.toThrow()
  })
})
