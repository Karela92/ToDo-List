import { combineReducers } from 'redux';
import todoListReducer from './todoList/reducers';

export default combineReducers({
  todoList: todoListReducer
})