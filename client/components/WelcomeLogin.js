import React from 'react'
import {connect} from 'react-redux'
const WelcomeLogin = props => {
  return (
    <div id="welcomePage">
     <h1>Welcome {props.currentUser.email}!</h1>
     <img id="daffy" src="https://i.pinimg.com/originals/e3/aa/49/e3aa49b47476e75174b9bee0e4656ee0.gif"/>
    </div>

  )
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})
export default connect(mapStateToProps)(WelcomeLogin)
