import { bindActionCreators } from 'redux';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Fio from '../components/Fio';
import * as FioActions from '../actions/fio';
import {deleteDetailIfNeeded} from '../actions/detail';

//Data that needs to be called before rendering the component
//This is used for server side rending via the fetchComponentDataBeforeRending() method
Fio.need = [
  FioActions.fetchLists
]

function mapStateToProps(state) {
  let { listsByFio } = state;
  listsByFio = listsByFio.present.fio;
  const {
    isFetching,
    lastUpdated,
    error,
    items: lists
  } = listsByFio || {
    isFetching: false,
    error:{},
    items: []
  };
  return {
    lists,
    isFetching,
    lastUpdated,
    error
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign({},{deleteDetailIfNeeded},FioActions);
  // console.log("FioActions",actions);
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Fio);