import { render } from '@redwoodjs/testing/web'

import PanelProvider from './PanelProvider'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PanelProvider', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PanelProvider />)
    }).not.toThrow()
  })
})
