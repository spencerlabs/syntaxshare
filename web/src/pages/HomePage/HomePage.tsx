import { useAuth } from 'src/auth'
import Workspace from 'src/components/Workspace/Workspace'
import WorkspacesCell from 'src/components/Workspace/WorkspacesCell'

const HomePage = () => {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? <WorkspacesCell /> : <Workspace />
}

export default HomePage
