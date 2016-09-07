import { bindActionCreators } from 'redux';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Detail from '../components/Detail';
import * as DetailActions from '../actions/detail';

//Data that needs to be called before rendering the component
//This is used for server side rending via the fetchComponentDataBeforeRending() method
Detail.need = [
  DetailActions.fetchDetail
]

function mapStateToProps(state,ownProps) {
  let { getDetail } = state;

  getDetail = getDetail.present.cio;
  const {
    isFetching,
    lastUpdated,
    error,
    detaildata: detaildata
  } = getDetail || {
    isFetching: true,
    error:{},
    detaildata: {}
  };
  return {
    detaildata,
    isFetching,
    lastUpdated,
    error,
    id:ownProps.params.id
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DetailActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Detail);