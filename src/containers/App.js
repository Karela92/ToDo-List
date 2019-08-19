import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store, persistor }  from '../store/configureStore';
import { PersistGate } from 'redux-persist/integration/react'

import TodoList from './TodoList.js/TodoList';

import './App.scss';

export default class App extends Component {

  render() {
    return (
      <Provider store={ store }>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <TodoList />
          </div>
        </PersistGate>
      </Provider>
    );
  }
}