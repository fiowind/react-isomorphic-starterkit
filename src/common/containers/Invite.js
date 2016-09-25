import { bindActionCreators } from 'redux';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import UserInvite from '../pages/UserInvite';
import * as Actions from '../actions';

//Data that needs to be called before rendering the component
//This is used for server side rending via the fetchComponentDataBeforeRending() method
UserInvite.need = [
  Actions.fetchInvite,
  Actions.fetchHome
]

function mapStateToProps(state,ownProps) {
  const {
    isFetching,
    lastUpdated,
    error,
    invitedata=state.invite.data,
    userdata=state.home.data.userdata
  } = state.invite || {
    isFetching: true,
    error:{},
    invitedata: [],
    userdata:{}
  };
  return {
    invitedata,
    userdata,
    isFetching,
    lastUpdated,
    error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(UserInvite);