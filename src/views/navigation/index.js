import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import auth from '../../utils/auth';
import PrivateRoute from '../components/privateRoute';
import Home from '../pages/home';
import NotFound from '../pages/NotFound';
import PrivateNavigation from './privateNavigation';



class Navigation extends React.Component {
  render() {
    // const authenticated = this.props.authenticated || auth.isSuccess() === 'true';
    return (
      <main>
        <Router>
          <Switch>
            <Route path="/home" name="Home" component={Home} />
            {/* <PrivateRoute path="/" name="full" component={PrivateNavigation} authenticated={authenticated} /> */}
            <Route path="*" name="notFound" component={NotFound} />
          </Switch>
        </Router>
      </main>
    );
  }
}

Navigation.defaultProps = {
  authenticated: false,
};

Navigation.propTypes = {
  authenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  authenticated: state.login.isSuccess,
});
export default connect(mapStateToProps)(Navigation);
