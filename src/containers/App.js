import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/configureStore';

import TodoList from './TodoList.js/TodoList';

import './App.scss';

// store.subscribe(() => localStorage.setItem('popularCities', JSON.stringify(store.getState().todoList)) );

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <TodoList />
          </div>
        </PersistGate>
      </Provider>
    );
  }
}
