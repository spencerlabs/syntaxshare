import { render } from '@redwoodjs/testing/web'

import CreatePanelButton from './CreatePanelButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CreatePanelButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreatePanelButton />)
    }).not.toThrow()
  })
})
