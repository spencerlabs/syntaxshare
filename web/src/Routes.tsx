import { PrivateSet, Router, Route, Set } from '@redwoodjs/router'

import { useAuth } from './auth'
import AppLayout from './layouts/AppLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={AppLayout}>
        <PrivateSet unauthenticated="home">
          <Route path="/{id}/download" page={DownloadPage} name="download" />
          <Route path="/{id}" page={WorkspacePage} name="workspace" />
        </PrivateSet>
        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
