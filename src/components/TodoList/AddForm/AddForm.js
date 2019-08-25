import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PRIORITIES } from '../../../siteConstants/Priorities';

import DatePicker from "react-datepicker";

import Input from '../../ui/Input/Input';
import Button from '../../ui/Button/Button';
import Textarea from '../../ui/Textarea/Textarea';
import Select from '../../ui/Select/Select';

import './AddForm.scss';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const DEFAULT_STATE = {
  title: '',
  description: '',
  priority: PRIORITIES[0],
  deadline: null,
  doneTime: null,
  error: false
};

export default class AddForm extends Component {

  state = {
    ...DEFAULT_STATE
  };

  static propTypes = {
    todoList: PropTypes.array
  };

  handleFieldChange = (fieldName, value) => {
    this.setState({
      [fieldName]: value
    });
  };

  renderFormTitle() {
    const { title } = this.state;
    return(
      <div className='formTitle'>
        <p>Name
          <span className='isRequiredField'> *</span>
        </p>
        <Input
          value={ title }
          placeHolder='Task name'
          handleChange={ (ev) => this.handleFieldChange('title', ev.target.value) }
        />
      </div>
    )
  }

  renderDeadline() {
    return(
      <div className='formDeadline'>
        <p>Deadline</p>
        <DatePicker
          dateFormat='dd.MM.yyyy'
          selected={ this.state.deadline }
          disable={true}
          strictParsing
          onChange={ (value) => this.handleFieldChange('deadline', value) }
          minDate={new Date()}
          placeholderText="Click to select a date"
        />
      </div>
    )
  }

  renderPriority() {
    return(
      <div className='formPriority'>
        <p>Priority
          <span className='isRequiredField'> *</span>
        </p>
        <Select
          label={ this.state.priority }
          options={ PRIORITIES }
          handleChange={ this.handleFieldChange }
        />
      </div>
    )
  }

  renderDescription() {
    const { description } = this.state;
    return(
      <div className='formDescription'>
        <p>Description
          <span className='isRequiredField'> *</span>
        </p>
        <Textarea
          handleChange={ this.handleFieldChange }
          description={ description }
        />
      </div>
    )
  }

  renderSubmitButton() {
    return(
      <div>
        <Button
          type='submit'
          content='Submit'
          styleType='primary'
          handleChange= { (ev) => this.handleSubmit(ev) }
        />
      </div>
    )
  }

  renderErrorMessage() {
    return (
      <div className='errorMessage'>
        Fill in required fields
      </div>
    )
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { todoList, updateItemsList } = this.props;
    const { title, description, priority, deadline } = this.state;
    if (title === '' || description === '' || priority === '') {
      this.setState(() => ({
        error: true
      }));
      return;
    }

    const params = {
      title,
      description,
      priority,
      deadline: deadline ? moment(deadline).format('DD.MM.YYYY') : null,
      createdTaskTime: new Date()
    };

    updateItemsList([...todoList, params]);
    this.setState({
      ...DEFAULT_STATE
    });
  }

  render() {
    return (
      <div className='addForm'>
        <div className='addForm__row'>
          { this.renderFormTitle() }
          { this.renderPriority() }
          { this.renderDeadline() }
          { this.renderDescription() }
        </div>
        <div>
          { this.state.error ? this.renderErrorMessage() : '' }
          { this.renderSubmitButton() }
        </div>
      </div>
    );
  }
}