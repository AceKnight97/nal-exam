import { DatePicker, TimePicker } from 'antd';
import classnames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import InputTitle from '../inputTitle';


const DatepickerCT = (props) => {
  const {
    className, title, placeholder, format, value, name, suffixIcon, type,
    disabledDate, disabled,
    availableDate, picker,
    allowClear, minuteStep,
    isOpen, onBlur, isRequired, inputReadOnly,
  } = props;

  const onChange = (date) => {
    props.onChange(name, date);
  };

  let disabledDateCT;
  switch (disabledDate) {
    case 'PAST': {
      disabledDateCT = current => current > moment().endOf('day');
      break;
    }
    case 'FUTURE': {
      disabledDateCT = current => current <= moment().endOf('day');
      break;
    }
    case 'TODAY_FUTURE': {
      disabledDateCT = current => current < moment().startOf('day');
      break;
    }
    case 'CUSTOM': {
      disabledDateCT = current => availableDate(current);
      break;
    }
    default: {
      break;
    }
  }

  return (
    <div className={classnames('date-picker-ct', className)}>
      <InputTitle title={title} isRequired={isRequired} />

      {
        type === 'TIME'
          ? (
            <TimePicker
              // ref={componentRef}
              disabled={disabled}
              getPopupContainer={trigger => trigger.parentElement}
              suffixIcon={suffixIcon}
              placeholder={placeholder}
              onChange={onChange}
              format={format}
              value={typeof (value) === 'string' && moment(value).isValid() ? moment(value) : value || undefined}
              disabledDate={disabledDateCT}
              minuteStep={minuteStep}
              showNow={false}
              onSelect={onChange}
            />
          ) : (
            <DatePicker
              open={isOpen}
              allowClear={allowClear}
              disabled={disabled}
              getPopupContainer={trigger => trigger.parentElement}
              suffixIcon={suffixIcon || undefined}
              placeholder={placeholder}
              onChange={onChange}
              format={format}
              value={typeof (value) === 'string' && moment(value).isValid() ? moment(value) : value || undefined}
              disabledDate={disabledDateCT}
              picker={picker}
              // showToday={false}
              onBlur={onBlur}
              inputReadOnly={inputReadOnly}
              showToday={false}
            />
          )
      }
    </div>
  );
};

DatepickerCT.defaultProps = {
  className: undefined,
  format: 'MM/DD/YYYY',
  title: '',
  placeholder: 'Select date',
  onChange: () => { },
  value: undefined,
  name: '',
  disabledDate: undefined,
  suffixIcon: undefined,
  type: 'DATE',
  disabled: false,
  availableDate: () => { },
  picker: undefined,
  allowClear: true,
  minuteStep: undefined,
  isOpen: undefined,
  onBlur: () => { },
  isRequired: false,
  inputReadOnly: false,
};

DatepickerCT.propTypes = {
  className: PropTypes.string,
  format: PropTypes.string,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string]),
  name: PropTypes.string,
  disabledDate: PropTypes.string,
  suffixIcon: PropTypes.shape(),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  availableDate: PropTypes.func,
  picker: PropTypes.string,
  allowClear: PropTypes.bool,
  minuteStep: PropTypes.number,
  isOpen: PropTypes.bool,
  onBlur: PropTypes.func,
  isRequired: PropTypes.bool,
  inputReadOnly: PropTypes.bool,
};

export default DatepickerCT;
