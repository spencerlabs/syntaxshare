import { Router, Route, Set } from '@redwoodjs/router'

import { useAuth } from './auth'
import AppLayout from './layouts/AppLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set wrap={AppLayout}>
        <Route path="/login" page={LoginPage} name="login" prerender />
        <Route path="/signup" page={SignupPage} name="signup" prerender />
        <Route path="/" page={HomePage} name="home" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
