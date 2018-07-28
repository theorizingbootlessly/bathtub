import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import {logout} from '../store'

class Navbar extends Component {
  constructor(props){
    super(props)

    this.handleLogout = this.handleLogout.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

    async handleLogout() {
    await axios.post('/auth/logout')
    this.props.logoutUser()
  }

  render() {
    const userIsLoggedIn = (this.props.currentUser.email)
    return (
      <nav>
      <Link to='/home'>Home</Link>
      {userIsLoggedIn ? <Link to='/home' onClick={this.handleLogout}>Logout</Link> : <Link to='/login'>Login</Link>}
      <Link to='/cart'>Cart</Link>
      <Link to='/products'>Products</Link>
      {userIsLoggedIn ? null : <Link to='/signup'>Sign-up</Link>}
        </nav>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('currentUser:', state.user.currentUser)
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
