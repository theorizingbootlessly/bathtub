import React, {Component} from 'react'
import axios from 'axios'

export default class LogIn extends Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value    
    })
  }

  async handleSubmit(event){
    event.preventDefault()
    try{
      //Axios request
      await axios.post('/api/auth', {
        email: this.state.email,
        password: this.state.password
      })
    }catch(err){
      console.log(err)
    }
  } 

  render(){
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="email" onChange={this.handle} value={this.state.email}></input>
          <label>Email</label>

          <input type="text" name="password" onChange={this.handle} value={this.state.password}></input>
          <label>Password</label>

          <button type='submit'>Sign In</button>
        </form>
      </React.Fragment>
    )
  }
}