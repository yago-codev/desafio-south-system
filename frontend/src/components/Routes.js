import React from 'react'

import {
  BrowserRouter,
  Router,
  Switch,
  Route,
} from 'react-router-dom'

import Login from '../pages/login'
import Register from '../pages/register'
import Dashboard from '../pages/dashboard'
import Creation from '../pages/creation'
import NotFound from './NotFound'
import PrivateRoute from './PrivateRoute'
import Detail from '../pages/detail'
import Edit from '../pages/edit'

import {
  history
} from '../history'

const Routes = () => (
  // <BrowserRouter>
  <Router history={history}>
    <Switch>
      <Route component={Register} exact path="/" />
      <Route component={Login} exact path="/login" />
      <PrivateRoute component={Dashboard} exact path="/dashboard" />
      <PrivateRoute component={Creation} exact path="/creation" />
      <PrivateRoute component={Detail} exact path="/detail/:id" />
      <PrivateRoute component={Edit} exact path="/edit/:id" />
      <PrivateRoute component={NotFound} />
    </Switch>
  </Router >
  // </BrowserRouter>
)

export default Routes