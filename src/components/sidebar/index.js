import {
  CaretDownOutlined,
  CaretUpOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import classnames from 'classnames';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import logo from '../../assets/images/components/sidebar/sidebar-logo.svg';
import { getFullName, toggleArr } from '../../utils';
import { useMergeState } from '../../utils/hooks';
import { logoutRequest } from '../../redux/actions/login';
import handleSignOut from '../../apollo/functions/handle/handleSignOut';
import auth from '../../utils/auth';

const { SubMenu } = Menu;

const ALL_TABS = {
  MY_CUSTOMERS: '/my-customers',
};

const { MY_CUSTOMERS } = ALL_TABS;

const Sidebar = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [state, setState] = useMergeState({
    pathname: '',
    openArr: [MY_CUSTOMERS],
  });
  const { className, menu } = props;
  const { openArr } = state;

  const { firstName, lastName, email } = auth.getUser();
  // console.log('object: ', auth.getUser());

  useEffect(() => {
    // console.log({ location });
    let pathname = location.pathname.split('/').slice(0, 3).join('/');
    if (pathname.includes(MY_CUSTOMERS)) {
      pathname = MY_CUSTOMERS;
    }
    setState({ pathname });
  }, [location.pathname]);

  const onTitleClick = ({ key }) => {
    const newArr = toggleArr(key, openArr);
    if (_.isEqual(newArr, openArr)) {
      return;
    }
    setState({ openArr: newArr });
  };

  const onClickKey = () => {
    // props.deletePathRequest();
  };

  const onClickSignOut = async () => {
    try {
      await handleSignOut();
      props.logoutRequest();
      history.push('/login');
    } catch (error) {
      console.log('Failed to log out: ', error);
    }
  };

  const renderMenu = () => (

    <Menu
      mode="inline"
      defaultOpenKeys={openArr}
      selectedKeys={[state.pathname]}
    >
      {_.map(menu, item => (item.sub ? (
        <SubMenu
          key={item.link}
          onTitleClick={onTitleClick}
          onClick={onClickKey}
          title={(
            <div className={classnames('fr-sb', 'pos-re', 'side-bar-submenu-item')}>
              <div>
                {item.icon || null}
                <span className="side-bar-item-text">{item.name}</span>
              </div>
              <div className="side-bar-item-caret">
                {openArr.includes(item.link) ? <CaretUpOutlined /> : <CaretDownOutlined /> }
              </div>
            </div>
          )}
        >
          {_.map(item.sub, d => (
            <Menu.Item key={d.link}>
              <NavLink key={d.link} to={d.link}>
                {d.name}
              </NavLink>
            </Menu.Item>
          ))}
        </SubMenu>
      ) : (
        <Menu.Item key={item.link} className="side-bar-menu">
          <NavLink key={item.link} to={item.link}>
            {item.icon || null}
            <span className="side-bar-item-text">{item.name}</span>
          </NavLink>
        </Menu.Item>
      )))}
    </Menu>

  );

  return (
    <div className={classnames('sidebar-wrapper', className)}>
      <div className="sidebar-wrapper-top">
        <img src={logo} alt="Logo ico" />

        <div className="sidebar-wrapper-top-info">
          <div className="sidebar-wrapper-top-info-full-name">
            <span>{getFullName({ firstName, lastName })}</span>
          </div>
          <div className="sidebar-wrapper-top-info-email">
            <span>{email}</span>
          </div>
        </div>

        {renderMenu()}
      </div>

      <div className="sidebar-wrapper-bot">
        <Button
          type="text"
          className="sidebar-wrapper-bot-sign-out-btn"
          onClick={onClickSignOut}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
};
Sidebar.defaultProps = {
  className: '',
  menu: [],
};
Sidebar.propTypes = {
  className: PropTypes.string,
  menu: PropTypes.arrayOf(PropTypes.shape()),
  logoutRequest: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  logoutRequest,
};

export default connect(null, mapDispatchToProps)(Sidebar);
