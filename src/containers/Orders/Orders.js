import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    let orders = null;

    if (!this.props.orders || Object.keys(this.props.orders).length === 0) {
      orders = (
        <h4 style={{ textAlign: 'center' }}>
          There are no orders created yet.
        </h4>
      );
    } else {
      orders = Object.keys(this.props.orders).map(key => (
        <Order
          key={key}
          ingredients={this.props.orders[key].ingredients}
          price={this.props.orders[key].price}
        />
      ));
    }

    return (
      <div style={{ padding: '10px' }}>
        {this.props.loading ? <Spinner /> : orders}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading
});

export default connect(mapStateToProps, {
  fetchOrders: actions.fetchOrders
})(withErrorHandler(Orders, axios));
