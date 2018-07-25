import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = ({handleClick, isLoggedIn}) => (
    <nav>
    <Link to='/home'>Home</Link>
    <Link to='/login'>Login</Link>
    <Link to='/cart'>Cart</Link>
    <Link to='/products'>Products</Link>
      </nav>
  )
export default Navbar;
