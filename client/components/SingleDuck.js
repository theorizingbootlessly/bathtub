import React from 'react'

const SingleDuck = ({duck}) => {
  return (
    <div>
      {duck.name}
      <div>
        <img src={duck.imgURL} />
      </div>
      <div>{duck.description}</div>
      <div>${duck.price}</div>
      <div>{duck.quantity} left!</div>
    </div>
  )
}

export default SingleDuck
