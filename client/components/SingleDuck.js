import React, {Component} from 'react'
import axios from 'axios'

export default class SingleDuck extends Component{
  constructor(){
    super()
    this.state = {
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  async handleSubmit(event){
    event.preventDefault()
    try{
      await axios.put(`/api/users/${this.props.user.id}/cart`, {id: this.props.duck.id})
    }catch(err){
      console.log(err)
    }
  }
  
  render(){
    const {duck} = this.props
    console.log(this.props)
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


const mapStateToProps = (state, ownProps) => {
  
}


