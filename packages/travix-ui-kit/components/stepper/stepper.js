import PropTypes from 'prop-types';
import classnames from 'classnames';
import React, { Component } from 'react';

/**
 * General Stepper component
 */
class Stepper extends Component {
  constructor(props) {
    super(props);

    this.validationFn = (stepper, triedValue) => stepper.setValue(triedValue);
    this.state = { currentValue: Math.max(Math.min(props.initValue, props.maxValue), props.minValue) };

    if (typeof props.validationFn === 'function') {
      this.validationFn = props.validationFn;
    }

    this.tryIncreaseValue = this.tryIncreaseValue.bind(this);
    this.tryDecreaseValue = this.tryDecreaseValue.bind(this);
    this.setValue = this.setValue.bind(this);
    this.getValue = this.getValue.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.initValue !== this.state.currentValue) {
      this.setState({
        currentValue: Math.max(Math.min(newProps.initValue, this.props.maxValue), this.props.minValue),
      });
    }
  }

  getValue() {
    return this.state.currentValue;
  }

  setValue(newValue, cb) {
    const newStateValue = Math.max(Math.min(newValue, this.props.maxValue), this.props.minValue);
    this.setState({
      currentValue: newStateValue,
    }, () => {
      if (cb) cb(newStateValue);
    });
  }

  tryDecreaseValue(event) {
    this.validationFn(this, this.state.currentValue - 1);
    event.preventDefault();
  }

  tryIncreaseValue(event) {
    this.validationFn(this, this.state.currentValue + 1);
    event.preventDefault();
  }

  renderHorizontal() {
    const buttonDecreaseClasses = classnames({
      'icon icon-100 icon-Buttons_arrowMinus ui-stepper-button ui-stepper-button_decrease': true,
      'disabled': this.state.currentValue === this.props.minValue,
    });

    const buttonIncreaseClasses = classnames({
      'icon icon-100 icon-Buttons_arrowPlus ui-stepper-button ui-stepper-button_increase': true,
      'disabled': this.state.currentValue === this.props.maxValue,
    });
    return (
      <div className="ui-stepper-content">
        <button
          className={buttonDecreaseClasses}
          onClick={this.tryDecreaseValue}
          type="button"
        />
        <div className="ui-stepper-value">{this.state.currentValue}</div>
        <div className="ui-stepper-shadow" />
        <button
          className={buttonIncreaseClasses}
          onClick={this.tryIncreaseValue}
          type="button"
        />
      </div>
    );
  }

  render() {
    const { key } = this.props;

    return (
      <div className="ui-stepper">
        <input
          id={key}
          name={key}
          type="hidden"
          value={this.state.currentValue}
        />
        {this.renderHorizontal()}
      </div>
    );
  }
}

Stepper.defaultProps = {
  initValue: 0,
  key: 'input',
  maxValue: 999,
  minValue: 0,
};

Stepper.propTypes = {
  /**
   * Initial value
   */
  initValue: PropTypes.number,
  /**
   * Name for component's input
   */
  key: PropTypes.string,
  /**
   * Minimum value
   */
  minValue: PropTypes.number,
  /**
   * Maximum value
   */
  maxValue: PropTypes.number,
  /**
   * Function to validate new value
   */
  validationFn: PropTypes.func,
};

export default Stepper;
