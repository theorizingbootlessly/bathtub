import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import {Router, Route, Switch} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import LogIn from './components/logIn-form'
import Signup from './components/Signup'
import Cart from './components/Cart'
import Checkout from './components/Checkout'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
      <Route exact path='/login' component={LogIn} />
      <Route exact path='/cart' component={Cart} />
      <Route exact path='/checkout' component={Checkout} />
      <Route exact path ='/signup' component={Signup} />
      <App />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
)
