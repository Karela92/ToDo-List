export const UPDATE_ITEMS_LIST = 'UPDATE_ITEMS_LIST';
export const UPDATE_SELECTED_PRIORITY = 'UPDATE_SELECTED_PRIORITY';

export const changePriority = (priority) => ({
  type: UPDATE_SELECTED_PRIORITY,
  payload: priority,
});

export const updateItemsList = (list) => ({
  type: UPDATE_ITEMS_LIST,
  payload: list,
});
