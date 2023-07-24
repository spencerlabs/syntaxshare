import WorkspaceCell from 'src/components/Workspace/WorkspaceCell'

type WorkspacePageProps = {
  id: string
}

const WorkspacePage = ({ id }: WorkspacePageProps) => {
  return <WorkspaceCell id={id} />
}

export default WorkspacePage
