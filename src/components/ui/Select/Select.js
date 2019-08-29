import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Select.scss'

export default class Select extends Component {

  state = {
    optionsIsVisible: false
  };

  static defaultProps = {
    label: 'Выберите пункт',
    itemIndex: 0
  };

  static propTypes = {
    label: PropTypes.string,
    options: PropTypes.array.isRequired,
    itemIndex: PropTypes.number
  };

  changeOptionsVisibility = () => {
    this.setState(prevState => ({ optionsIsVisible: !prevState.optionsIsVisible }));
  };

  handleSelectOption(option) {
    this.setState(() => ({ optionsIsVisible: false }), this.props.handleChange('priority', option, this.props.itemIndex));
  };

  blurHandler = () => {
    this.setState(() => ({ optionsIsVisible: false }));
  };

  render() {
    const { optionsIsVisible } = this.state;
    const { options, label } = this.props;
    return (
      <div
        className='selectedBlock'
         onBlur={this.blurHandler}
         tabIndex={0}
      >
        <div
          className='selectedBlock__label'
          onClick={ this.changeOptionsVisibility  }
        >
          { label }
        </div>
        <div className={ `selectedBlock__options ${ optionsIsVisible ? 'optionsIsVisible' : '' }` }>
          { options.map((option, index) => {
            return(
              <div
                key={ index }
                className='option'
                onClick={ () => this.handleSelectOption(option) }
              >
                { option }
              </div>
            )
          }) }
        </div>
      </div>
    );
  }
}