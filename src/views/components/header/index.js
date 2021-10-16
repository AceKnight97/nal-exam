import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { } from 'antd';


const Header = (props) => {
  const { className } = props;
  return (
    <div className={classnames('header', className)}>
      <span>Nal Exam</span>
    </div>
  );
};
Header.defaultProps = {
  className: '',
};
Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
