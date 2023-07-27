import { useEffect, useState } from 'react'

import { TbCodeCircle } from 'react-icons/tb'

import { useAuth } from 'src/auth'
import CreateWorkspaceButton from 'src/components/CreateWorkspaceButton'
import Workspace from 'src/components/Workspace/Workspace'
import WorkspacesCell from 'src/components/Workspace/WorkspacesCell'

const HomePage = () => {
  const { isAuthenticated } = useAuth()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-[75vh] w-full flex-col items-center justify-center px-wrap py-12">
        <TbCodeCircle
          className="h-10 w-10 animate-bounce text-emerald-500"
          aria-hidden
        />
        <div className="text-center text-lg font-semibold">
          Loading workspace...
        </div>
      </div>
    )
  }

  return isAuthenticated ? (
    <>
      <header className="mb-6 flex items-center justify-between space-x-4">
        <h1>Workspaces</h1>
        <CreateWorkspaceButton />
      </header>
      <WorkspacesCell />
    </>
  ) : (
    <Workspace />
  )
}

export default HomePage
