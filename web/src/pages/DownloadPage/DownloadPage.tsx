import { MetaTags } from '@redwoodjs/web'

import WorkspaceDownloadCell from 'src/components/WorkspaceDownloadCell'

type DownloadPageProps = {
  id: string
}

const DownloadPage = ({ id }: DownloadPageProps) => {
  return (
    <>
      <MetaTags title="Download" />

      <WorkspaceDownloadCell id={id} />
    </>
  )
}

export default DownloadPage
