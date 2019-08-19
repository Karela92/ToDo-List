import { UPDATE_ITEMS_LIST, UPDATE_SELECTED_PRIORITY } from './actions';

const initialState = {
  todoList: [],
  filteredTodoList: [],
  selectedPriority: 'All'
};

export default (state = initialState, action) => {
  console.log(action,'act');
  switch(action.type) {
    case UPDATE_ITEMS_LIST:
      return {
        ...state, todoList: [ ...action.payload ]
      };
    case UPDATE_SELECTED_PRIORITY:
      return {
        ...state,
        filteredTodoList: [...action.payload.filteredTodoList],
        selectedPriority: action.payload.selectedTab
      };

    default:
      return state;
  }
}