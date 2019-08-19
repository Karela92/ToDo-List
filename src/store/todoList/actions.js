export const
  UPDATE_ITEMS_LIST = 'UPDATE_ITEMS_LIST',
  UPDATE_SELECTED_PRIORITY = 'UPDATE_SELECTED_PRIORITY';

export const changePriority = priority => {
  return {
    type: UPDATE_SELECTED_PRIORITY,
    payload: priority,
  }
};

export const updateItemsList = list => {
  return {
    type: UPDATE_ITEMS_LIST,
    payload: list,
  }
};