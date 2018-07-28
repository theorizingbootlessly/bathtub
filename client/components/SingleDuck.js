import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'


class SingleDuck extends Component{
  constructor(){
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  async handleSubmit(event){
    event.preventDefault()
    try{
      await axios.post(`/api/cart/${this.props.currentUser.user.currentUser.id}/cart`, {id: this.props.duck.id})
    }catch(err){
      console.log(err)
    }
  }
  
  render(){
    const {duck} = this.props
    return (
      <div>
        {duck.name}
        <div>
          <img src={duck.imgURL} />
        </div>
        <div>{duck.description}</div>
        <div>${duck.price}</div>
        <div>{duck.quantity} left!</div>
        <button type="submit" onClick={this.handleSubmit}>Add to Cart</button>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  const getUser = state
  return {
    currentUser: getUser
  }
}

export default connect(mapStateToProps)(SingleDuck)
