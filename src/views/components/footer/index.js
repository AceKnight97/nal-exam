import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { } from 'antd';


const Footer = (props) => {
  const { className } = props;
  return (
    <div className={classnames('footer', className)}>
      <span>Truong Thanh Triet - Front-end Developer - tttriet1997@gmail.com</span>
    </div>
  );
};
Footer.defaultProps = {
  className: '',
};
Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
