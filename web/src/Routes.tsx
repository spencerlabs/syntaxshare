import { Router, Route, Set } from '@redwoodjs/router'

import { useAuth } from './auth'
import AppLayout from './layouts/AppLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={AppLayout}>
        <Route path="/login" page={LoginPage} name="login" />
        <Set private unauthenticated="login">
          <Route path="/{id}" page={WorkspacePage} name="workspace" />
        </Set>
        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
