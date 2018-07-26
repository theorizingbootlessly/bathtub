import React from 'react'
import {Navbar} from './components'
import LandingPage from './components/LandingPage'
import List from './components/List'
import Cart from './components/Cart'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <List /> */}
      <LandingPage />
    </div>
  )
}

export default App
