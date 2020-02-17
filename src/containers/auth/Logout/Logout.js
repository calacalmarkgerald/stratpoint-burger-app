import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';
import { Redirect } from 'react-router-dom';

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return <Redirect to='/' />;
  }
}

export default connect(null, {
  logout: actions.logout
})(Logout);
