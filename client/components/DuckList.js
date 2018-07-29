import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {fetchDucks} from '../store/products'
import SingleDuck from './SingleDuck'

class DuckList extends React.Component {
  componentDidMount() {
    this.props.loadDucks()
  }
  render() {
    return (
      <div>
        {this.props.allDucks.map(duck => (  
           <SingleDuck key={duck.id} duck={duck} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allDucks: state.products.allDucks
})

const mapDispatchToProps = dispatch => ({
  loadDucks: () => {
    // console.log('sdsd', response)
    dispatch(fetchDucks())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DuckList)
