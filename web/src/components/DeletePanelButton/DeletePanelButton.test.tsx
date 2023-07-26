import { render } from '@redwoodjs/testing/web'

import DeletePanelButton from './DeletePanelButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DeletePanelButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DeletePanelButton />)
    }).not.toThrow()
  })
})
