import React, {Component} from 'react'
import axios from 'axios'
// const SingleDuck = ({duck}) => {
//   return (
//     <div>
//       {duck.name}
//       <div>
//         <img src={duck.imgURL} />
//       </div>
//       <div>{duck.description}</div>
//       <div>${duck.price}</div>
//       <div>{duck.quantity} left!</div>
//       <button type="submit">Add to Cart</button>
//     </div>
//   )
// }

export default class SingleDuck extends Component{
  constructor(){
    super()
    this.state = {

    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  async handleSubmit(event){
    event.preventDefault()
    await axios.put('api/users/:userOrGuest/cart', )

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





// export default SingleDuck
