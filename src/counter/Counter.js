import { connect } from 'react-redux'

// Importing Action Creators
import { incrementCounter, decrementCounter } from '../actions/actions'
import PropTypes from 'prop-types'
import React from 'react'

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  increment() {
    this.props.incrementAction()
  }

  decrement() {
    this.props.decrementAction()
  }

  render() {
    return (
      <div>
        <button onClick={this.increment}>Increment</button>
        <br />
        <button onClick={this.decrement}>Decrement </button>
        <p>COUNTER: {this.props.counter}</p>
      </div>
    )
  }
}

Counter.protoTypes = {
  counter: PropTypes.number,
  incrementAction: PropTypes.func,
  decrementAction: PropTypes.func,
}

function mapStateToProps(state) {
  return {
    counter: state.updateCounter.counter,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    incrementAction: () => dispatch(incrementCounter()),
    decrementAction: () => dispatch(decrementCounter()),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
