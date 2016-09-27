import { bindActionCreators } from 'redux';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Home from '../pages/Home';
import * as Actions from '../actions';

//Data that needs to be called before rendering the component
//This is used for server side rending via the fetchComponentDataBeforeRending() method
Home.need = [
  Actions.fetchHome
]

function mapStateToProps(state,ownProps) {
  // console.log("mapStateToProps",state);
  const {
    isFetching,
    lastUpdated,
    error,
    homedata=state.home.data
  } = state.home || {
    isFetching: true,
    error:{},
    homedata: {}
  };
  return {
    homedata,
    isFetching,
    lastUpdated,
    error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);