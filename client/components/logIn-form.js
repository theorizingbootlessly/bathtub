import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {Login} from './auth-form'
import {set_currentUser} from '../store'

class LogIn extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      redirect: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()

    try {
      //Axios request
      const checkLogIn = await axios.post('/auth/login', {
        email: this.state.email,
        password: this.state.password
      })
      if (checkLogIn) {
        this.props.setCurrentUser(checkLogIn.data)

        this.setState({
          redirect: true
        })
      }
    } catch (err) {
      alert(
        'Sorry, cannot find user. Please make sure your email and password are typed in correctly'
      )
      this.setState({
        password: ''
      })
      console.log(err)
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/welcome" />
    }
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <label>Email</label>
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <label>Password</label>
          <button type="submit">Sign In</button>
        </form>
        <a href="/auth/google">login with Google</a>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: currentUser => dispatch(set_currentUser(currentUser))
  }
}

export default connect(null, mapDispatchToProps)(LogIn)
