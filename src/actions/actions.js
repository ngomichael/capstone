import * as actionTypes from './actionTypes'

// Action Creators
export function incrementCounter() {
  return { type: actionTypes.INCREMENT_COUNTER }
}

export function decrementCounter() {
  return { type: actionTypes.DECREMENT_COUNTER }
}
