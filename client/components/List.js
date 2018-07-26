import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {fetchDucks} from '../store/products'

class List extends React.Component {
  async componentDidMount() {
    console.log(this.props)
  }
  render() {
    return <div>hello</div>
  }
}

const mapStateToProps = state => ({
  products: state.allDucks
})

const mapDispatchToProps = dispatch => {
  fetchDucks: () => {
    const response = fetchDucks()
    // console.log('sdsd', response)
    dispatch(response)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
