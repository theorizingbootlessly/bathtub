import React from 'react'
import {Navbar} from './components'
import LandingPage from './components/LandingPage'
import {Route, Switch} from 'react-router-dom'
import LogIn from './components/logIn-form'
import Signup from './components/Signup'
import Cart from './components/Cart'
import DuckList from './components/DuckList'
import Checkout from './components/Checkout'
import WelcomeLogin from './components/WelcomeLogin'

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/products" component={DuckList} />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={LandingPage} />
        <Route exact path="/welcome" component={WelcomeLogin} />
      </Switch>
    </div>
  )
}

export default App
