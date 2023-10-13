import { render } from '@redwoodjs/testing/web'

import DownloadPage from './DownloadPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DownloadPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DownloadPage id={'42'} />)
    }).not.toThrow()
  })
})
