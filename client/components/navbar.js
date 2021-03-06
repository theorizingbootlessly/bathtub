import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import {logout, set_currentUser} from '../store'

class Navbar extends Component {
  constructor(props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this)
  }

  async componentDidMount() {
    let result = await axios.get('/auth/me')

    if (result.data.loggedIn) {
      this.props.setCurrentUser(result.data.user)
    }
  }

  async handleLogout() {
    await axios.post('/auth/logout')
    this.props.logoutUser()
  }

  render() {
    const userIsLoggedIn = this.props.currentUser.email
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navBar">
        <Link to="/home">Home</Link>
        {userIsLoggedIn ? (
          <Link to="/home" onClick={this.handleLogout}>
            Logout
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <Link to="/cart">Cart</Link>
        <Link to="/products">Products</Link>
        {userIsLoggedIn ? (
          <h3 id="welcome">Welcome, {this.props.currentUser.email}</h3>
        ) : (
          <Link to="/signup">Sign-up</Link>
        )}
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logout()),
    setCurrentUser: user => dispatch(set_currentUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
