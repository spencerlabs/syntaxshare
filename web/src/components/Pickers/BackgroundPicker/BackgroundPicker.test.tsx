import { render } from '@redwoodjs/testing/web'

import BackgroundPicker from './BackgroundPicker'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BackgroundPicker', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BackgroundPicker />)
    }).not.toThrow()
  })
})
