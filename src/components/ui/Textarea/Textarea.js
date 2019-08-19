import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContentEditable from 'react-contenteditable'

import './Textarea.scss';

export default class Textarea extends Component {

  constructor() {
    super();
    this.contentEditable = React.createRef();
  };

  static propTypes = {
    handleChange: PropTypes.func,
    itemIndex: PropTypes.number
  };

  static defaultProps = {
    handleChange: () => {},
    itemIndex: 0
  };

  render() {
    const { handleChange, itemIndex, description } = this.props;
    return (
      <ContentEditable
        innerRef={this.contentEditable}
        html={description}
        disabled={false}
        onChange={(ev) => handleChange('description', ev.target.value, itemIndex)}
        className='textareaBlock'
      />
    );
  }
}