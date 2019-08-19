import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TabsPriority.scss';

const PRIORITIES_TABS = ['All', 'Low', 'Middle', 'High'];

export default class TabsPriority extends Component {

  static propTypes = {
    selectedPriority: PropTypes.string,
    changePriority: PropTypes.func
  };

  getArrayByFilter(todoList, tab) {
    const { changePriority } = this.props;
    const filteredTodoList = todoList.filter(item => item.priority === tab);
    changePriority({ filteredTodoList, selectedTab: tab })
  }

  render() {
    const { todoList, selectedPriority } = this.props;
    if (!todoList.length) {
      return null;
    }
    return (
      <div className='prioritiesTabs'>
        { PRIORITIES_TABS.map((tab, index) => {
          return (
            <span
              key={ index }
              className={`tab ${selectedPriority === tab ? 'isActive' : ''}`}
              onClick={ () => this.getArrayByFilter(todoList, tab) }
            >
              { tab }
            </span>
          )
        }) }
      </div>
    );
  }
}