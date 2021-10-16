import { Layout, Space, Spin } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Sidebar from '../../components/sidebar';

const Menu = [
  {
    name: 'Patients',
    link: '/patients',
    sub: [
      {
        name: 'New',
        link: '/patients/new',
      },
      {
        name: 'Active',
        link: '/patients/active',
      },
      {
        name: 'Inactive',
        link: '/patients/inactive',
      },
    ],
  },
  {
    name: 'Reports',
    link: '/reports',
    sub: [
      {
        name: 'Study notification',
        link: '/reports/hm-notification',
      },
      {
        name: 'Notification',
        link: '/reports/notification',
      },
      {
        name: 'Monthly',
        link: '/reports/monthly',
      },
    ],
  },
];

const PrivateNavigation = (props) => {
  useEffect(() => {
    window.onbeforeunload = () => { };
    window.onload = () => { };
  }, []);

  return (
    <div className="app">
      <div className="app-body">
        <main className="main">

          <Layout className="div-root">
            <Sidebar menu={[
              { name: 'My Customers', link: '/my-customers' },
            ]}
            />
            <div className="div-root-body">
              {
                  props.loading && (
                  <Space className="loading-space" size="middle">
                    <Spin size="large" />
                  </Space>
                  )
                }
              <Switch>
                {/* <Route exact path="/my-customers" name="My Customers" component={MyCustomers} />
                <Route exact path="/my-customers-details/:id" name="My Customers Details" component={MyCustomersDetails} />
                <Route exact path="/my-customers-new-contract" name="My Customers New Contract" component={MyCustomersNewContract} /> */}
                <Redirect from="/" to="/home" />
              </Switch>
            </div>
          </Layout>
        </main>
      </div>
    </div>
  );
};
PrivateNavigation.defaultProps = {
  loading: false,
};

PrivateNavigation.propTypes = {
  loading: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    login: state.login,
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateNavigation);
