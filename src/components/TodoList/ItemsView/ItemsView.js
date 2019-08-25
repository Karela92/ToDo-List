import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { PRIORITIES } from '../../../siteConstants/Priorities';

import Input from '../../ui/Input/Input';
import Button from '../../ui/Button/Button';
import Textarea from '../../ui/Textarea/Textarea';
import Select from '../../ui/Select/Select';

import './ItemsView.scss';

export default class ItemsView extends Component {

  handleFieldChange = (fieldName, value, index) => {
    const { todoList, updateItemsList } = this.props;
    const updatedTodoList = _.cloneDeep(todoList);
    updatedTodoList[index][fieldName] = value;
    updateItemsList([
      ...updatedTodoList
    ]);
  };

  handleRemoveItem(index) {
    const { todoList, updateItemsList } = this.props;
    updateItemsList([
      ...todoList.slice(0, index), ...todoList.slice(index + 1)
    ]);
  }

  renderFormTitle(title, index) {
    return(
      <div className='formTitle'>
        <p>Name</p>
        <Input
          value={ title }
          placeHolder='Task name'
          handleChange={ (ev) => this.handleFieldChange('title', ev.target.value, index) }
        />
      </div>
    )
  }

  renderDeadline(deadline, index) {
    const updateDate = deadline === null ? null : moment(deadline, 'DD.MM.YYYY').toDate();
    return(
      <div className='formDeadline'>
        <p>Deadline</p>
        <DatePicker
          selected={ updateDate }
          disable={true}
          dateFormat='dd/MM/yyyy'
          onChange={ (value) => this.handleFieldChange('deadline', moment(value).format('DD.MM.YYYY'), index) }
          minDate={new Date()}
          placeholderText="Click to select a date"
        />
      </div>
    )
  }

  renderPriority(priority, index) {
    return(
      <div className='formPriority'>
        <p>Priority</p>
        <Select
          itemIndex={ index }
          label={ priority }
          options={ PRIORITIES }
          handleChange={ this.handleFieldChange }
        />
      </div>
    )
  }

  renderDescription(description, index) {
    return(
      <div className='formDescription'>
        <p>Description</p>
        <Textarea
          itemIndex={ index }
          handleChange={ this.handleFieldChange }
          description={ description }
        />
      </div>
    )
  }

  renderDoneTime(doneTime, index) {
    return(
      <div className='formDoneTime'>
        { doneTime ?
          <>
            <p>Done:</p>
            <div>{ doneTime }</div>
          </> :
          <div className='formDoneButton'>
            <Button
              content='Done'
              handleChange={ () => this.handleFieldChange('doneTime', moment(new Date()).format('MMM Do YYYY'), index) }
            />
          </div>
        }
      </div>
    )
  }

  renderRemoveItem(index) {
    return (
      <div className='formRemoveButton'>
        <Button
          content='Remove'
          styleType='primary  removeButton'
          handleChange={ () => this.handleRemoveItem(index) }
        />
      </div>
    )
  }

  renderCreatedTaskTime(createdTaskTime) {
    if(!createdTaskTime) {
      return null;
    }
    return(
      <div className='formCreatedTime'>
        <p>Created:</p>
        <div>{ moment(createdTaskTime).format('MMM Do YYYY') }</div>
      </div>
    )
  }

  render() {
    const { todoList, selectedPriority } = this.props;
    if (!todoList.length) {
      return null;
    }
    const isSelectedPriorityItemExist = todoList.find(todoItem => todoItem.priority === selectedPriority);
    return (
      <div className='todoListView'>
        {
          isSelectedPriorityItemExist || selectedPriority === 'All'?
            todoList.map((todoItem, index) => {
              if (selectedPriority === 'All' || todoItem.priority === selectedPriority) {
                return (
                  <div key={ index } className={`itemForm ${ todoItem.doneTime ? 'itsDone' : ''}`} >
                    <div className='itemForm__row'>
                      { this.renderFormTitle(todoItem.title, index) }
                      { this.renderPriority(todoItem.priority, index) }
                      { this.renderDeadline(todoItem.deadline, index) }
                      { this.renderDescription(todoItem.description, index) }
                      { this.renderCreatedTaskTime(todoItem.createdTaskTime) }
                      { this.renderDoneTime(todoItem.doneTime, index) }
                      { this.renderRemoveItem(index) }
                    </div>
                  </div>
                )
              }
            }) :
            <div className='emptyItemRow'>Tasks with {selectedPriority} priority not exist</div>
        }
      </div>
    );
  }

}