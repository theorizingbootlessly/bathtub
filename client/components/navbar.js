import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => (
    <nav>
    <Link to='/home'>Home</Link>
    <Link to='/login'>Login</Link>
    <Link to='/cart'>Cart</Link>
    <Link to='/products'>Products</Link>
    <Link to='/signup'>Sign-up</Link>
      </nav>
  )
export default Navbar;
