import React, {Component} from 'react'
import {connect} from 'react-redux'
import {users, add_user} from '../store'

class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      validatePassword: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.inputsAreValid = this.inputsAreValid.bind(this)
    this.passwordIsValid = this.passwordIsValid.bind(this)
    this.emailIsValid = this.emailIsValid.bind(this)
    this.emailsMatch = this.emailsMatch.bind(this)
  }

  componentDidMount() {
    this.props.getUsers()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.inputsAreValid() === true) {
      const user = {email: this.state.email, password: this.state.password}
      this.props.addUser(user)
      this.props.history.push('/home')
    } else {
      this.setState({
        password: '',
        validatePassword: ''
      })

      alert('invalid email or password')
    }
  }

  inputsAreValid() {
    return this.passwordIsValid() && this.emailIsValid()
  }

  passwordIsValid() {
    const minimumPasswordLength = 8
    const password = this.state.password

    return (
      password === this.state.validatePassword &&
      password.length >= minimumPasswordLength
    )
  }

  emailIsValid() {
    const email = this.state.email

    if (this.emailsMatch() === true) {
      return false
    }

    var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return regexEmail.test(String(email).toLowerCase())
  }

  emailsMatch() {
    let emailsMatch = false

    const enteredEmail = this.state.email

    this.props.users.forEach(user => {
      if (user.email.toLowerCase() === enteredEmail.toLowerCase()) {
        emailsMatch = true
      }
    })

    return emailsMatch
  }

  render() {
    return (
      <div>
        <form>
          <label>
            Email:
            <br />
            <input
              type="text"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </label>
          <label>
            Password:
            <br />
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </label>
          <label>
            Validate Password:
            <br />
            <input
              type="password"
              name="validatePassword"
              onChange={this.handleChange}
              value={this.state.validatePassword}
            />
          </label>
        </form>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(users()),
    addUser: user => dispatch(add_user(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
