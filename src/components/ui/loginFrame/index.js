import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { } from 'antd';
import logoIc from '../../../assets/images/login/logo.svg';
import textLogoIc from '../../../assets/images/login/text-logo.svg';


const LoginFrame = (props) => {
  const { className, children } = props;
  return (
    <div className={classnames('login-frame', className)}>
      <div className="login-frame-main">
        <div className="login-frame-main-inputs">
          {children}
        </div>
      </div>
      <div className="login-frame-decoration">
        <img src={logoIc} alt="Logo icon" />
        <div className="login-frame-decoration-bottom">
          <div className="login-frame-decoration-bottom-text">
            <span>Powered by</span>
          </div>
          <img src={textLogoIc} alt="Logo icon" className="login-frame-decoration-bottom-text-logo" />
        </div>
      </div>
    </div>
  );
};
LoginFrame.defaultProps = {
  className: '',
  children: {},
};
LoginFrame.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default LoginFrame;
