import initialState from './initialState'
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/actionTypes'

export default function updateCounter(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        counter: state.counter + 1,
      }
    case DECREMENT_COUNTER:
      return {
        counter: state.counter - 1,
      }
    default:
      return state
  }
}
