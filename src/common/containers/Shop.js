import { bindActionCreators } from 'redux';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as ShopActions from '../actions/shop';
import Shoplist from '../components/shoplist';

//Data that needs to be called before rendering the component
//This is used for server side rending via the fetchComponentDataBeforeRending() method
Shoplist.need = [
  ShopActions.fetchShopLists
]

function mapStateToProps(state) {
  let { shop } = state;
  // console.log('shop mapStateToProps',state)
  const {
    isFetching,
    ispageFetching,
    error,
    lastUpdated,
    shoplists=shop.data
  } = shop || {
    isFetching: false,
    ispageFetching: false,
    error:{},
    shoplists: []
  };
  return {
    shoplists,
    lastUpdated,
    isFetching,
    error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ShopActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Shoplist);