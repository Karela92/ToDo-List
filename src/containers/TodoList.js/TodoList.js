import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateItemsList, changePriority } from '../../store/todoList/actions';

import ItemsView from '../../components/TodoList/ItemsView/ItemsView';
import AddForm from '../../components/TodoList/AddForm/AddForm';
import TabsPriority from '../../components/TodoList/TabsPriority/TabsPriority';

import './ToDoList.scss';

class TodoList extends Component {
  render() {
    const {
      updateItemsList, todoList, selectedPriority, changePriority, filteredTodoList,
    } = this.props;
    return (
      <div className="todoList">
        <h1>ToDo List</h1>
        <TabsPriority
          selectedPriority={selectedPriority}
          changePriority={changePriority}
          todoList={todoList}
        />
        <ItemsView
          updateItemsList={updateItemsList}
          todoList={todoList}
          filteredTodoList={filteredTodoList}
          selectedPriority={selectedPriority}
        />
        <AddForm
          todoList={todoList}
          updateItemsList={updateItemsList}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todoList: state.todoList.todoList,
  selectedPriority: state.todoList.selectedPriority,
  filteredTodoList: state.todoList.filteredTodoList,
});

const mapDispatchToProps = {
  updateItemsList,
  changePriority,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);