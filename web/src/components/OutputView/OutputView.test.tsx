import { render } from '@redwoodjs/testing/web'

import OutputView from './OutputView'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('OutputView', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OutputView />)
    }).not.toThrow()
  })
})
