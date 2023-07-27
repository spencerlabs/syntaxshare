import { render } from '@redwoodjs/testing/web'

import CodeSizePicker from './CodeSizePicker'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CodeSizePicker', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CodeSizePicker />)
    }).not.toThrow()
  })
})
