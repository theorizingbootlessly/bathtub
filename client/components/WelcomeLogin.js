import React from 'react'
import {connect} from 'react-redux'
const WelcomeLogin = props => {
  return <h1>Welcome {props.currentUser.email}!</h1>
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})
export default connect(mapStateToProps)(WelcomeLogin)
