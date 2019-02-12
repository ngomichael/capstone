import { combineReducers } from 'redux'
import updateCounter from './counterReducer'

const rootReducer = combineReducers({
  updateCounter,
})

export default rootReducer
