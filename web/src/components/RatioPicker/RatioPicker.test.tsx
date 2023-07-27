import { render } from '@redwoodjs/testing/web'

import RatioPicker from './RatioPicker'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RatioPicker', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RatioPicker />)
    }).not.toThrow()
  })
})
