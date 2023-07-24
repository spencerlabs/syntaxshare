import { Router, Route, Set } from '@redwoodjs/router'

import { useAuth } from './auth'
import AppLayout from './layouts/AppLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={AppLayout}>
        <Set private unauthenticated="login">
          <Route path="/workspaces/{id}" page={WorkspacePage} name="workspace" />
          <Route path="/workspaces" page={WorkspacesPage} name="workspaces" />
        </Set>
        <Route path="/login" page={LoginPage} name="login" prerender />
        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
