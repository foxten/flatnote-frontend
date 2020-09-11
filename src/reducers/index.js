import { combineReducers } from 'redux'
import login from './login'
import notes from './notes'


export default combineReducers({
  login: login,
  notes: notes
})