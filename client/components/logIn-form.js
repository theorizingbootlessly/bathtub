import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import App from '../app'

export default class LogIn extends Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: '',
      redirect: false
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
      const checkLogIn = await axios.post('/auth/login', {
        email: this.state.email,
        password: this.state.password
      })
      if (checkLogIn){
        this.setState({
          redirect: true
        })
      } 
    }catch(err){
      console.log(err)
    }
  }

  render(){
    if (this.state.redirect){
      return <App />
    }
  
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="email" onChange={this.handleChange} value={this.state.email}></input>
          <label>Email</label>

          <input type="text" name="password" onChange={this.handleChange} value={this.state.password}></input>
          <label>Password</label>

          <button type='submit'>Sign In</button>
        </form>
      </React.Fragment>
    )
  }
}