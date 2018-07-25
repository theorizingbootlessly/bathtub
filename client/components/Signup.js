import React, {Component} from 'react'

 class Signup extends Component {

  constructor (props){
    super (props);

    this.state = {
      username: '',
      email: '',
      password: '',
      validatePassword: ''
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.inputsAreValid = this.inputsAreValid.bind(this)
    this.passwordIsValid = this.passwordIsValid.bind(this)
    this.emailIsValid = this.emailIsValid.bind(this)
    this.userNameIsValid = this.userNameIsValid.bind(this)
  }

  handleChange(event){

    this.setState({
      [event.target.name] : event.target.value,
    })
  }

  handleSubmit(event){
    event.preventDefault();

    if (this.inputsAreValid() === true) {
      console.log('Valid')
    } else {
      console.log('Invalid')
    }
  }

  inputsAreValid(){
    return (
      this.passwordIsValid && this.emailIsValid && this.userNameIsValid
    )
  }

  passwordIsValid (){

    const minimumPasswordLength = 8
    const password = this.state.password

    return (password === this.state.validatePassword && password.length >= minimumPasswordLength)
  }

  emailIsValid (){
    /*
      requires cross-reference of emails in our database
    */
  }

  userNameIsValid (){
    /*
      requires cross-reference of usernames in our database
    */
  }


  render(){
    return (
      <div>
        <form>
          <label>
            User name:
        <input type='text' name='username' onChange={this.handleChange} value={this.state.username}/>
          </label>
          <label>
            Email:
        <input type='text' name='email' onChange={this.handleChange} value={this.state.email}/>
          </label>
          <label>
            Password:
        <input type='text' name='password' onChange={this.handleChange} value={this.state.password}/>
          </label>
          <label>
            Validate Password:
        <input type='text' name='validatePassword' onChange={this.handleChange} value={this.state.validatePassword}/>
          </label>
        </form>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

export default Signup;
