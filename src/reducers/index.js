import { combineReducers } from 'redux'
import login from './login'
import notes from './notes'
import category from './category'


export default combineReducers({
  login: login,
  notes: notes,
  category: category
})