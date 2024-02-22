import { Metadata } from '@redwoodjs/web'

import WorkspaceDownloadCell from 'src/components/WorkspaceDownloadCell'

type DownloadPageProps = {
  id: string
}

const DownloadPage = ({ id }: DownloadPageProps) => {
  return (
    <>
      <Metadata title="Download" />

      <WorkspaceDownloadCell id={id} />
    </>
  )
}

export default DownloadPage
