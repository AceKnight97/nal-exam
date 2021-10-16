import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


const InputTitle = (props) => {
  const { className, title, isRequired } = props;
  if (title) {
    return (
      <div className={classnames('input-title', className)}>
        <span>{title}</span>
        {
          isRequired && (
            <div className="input-title-is-required">
              <span>*</span>
            </div>
          )
        }
      </div>
    );
  }
  return null;
};
InputTitle.defaultProps = {
  className: '',
  title: '',
  isRequired: false,
};
InputTitle.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default InputTitle;
