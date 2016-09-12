
import { bindActionCreators } from 'redux';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import ShopDetail from '../components/shopdetail';
import * as ShopActions from '../actions/shop';

//Data that needs to be called before rendering the component
//This is used for server side rending via the fetchComponentDataBeforeRending() method
ShopDetail.need = [
  ShopActions.fetchShopDetail
]

function mapStateToProps(state,ownProps) {
  let { shop } = state;
  // console.log("detail state",state);
  // if(shop.detaildata){
  // 	let detaildata = shop.detaildata;
  // 	if(typeof(detaildata) === "string"){
  // 		let length = detaildata.length;
  // 		detaildata = detaildata.substr(1,length-1);
  // 		// console.log('detaildata',detaildata);
  // 		detaildata = eval(detaildata);
  // 	}
  // }
  const {
    isFetching,
    lastUpdated,
    error,
    detaildata=shop.detaildata
  } = shop || {
    isFetching: true,
    error:{},
    detaildata: {}
  };
  return {
    detaildata,
    isFetching,
    lastUpdated,
    error,
    pid:ownProps.params.pid
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ShopActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ShopDetail);