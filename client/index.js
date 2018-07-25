import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Switch, Route} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import Signup from './components/Signup'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
    <Switch>
    <Route exact path ='/signup' component={Signup} />
      <App />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
)
