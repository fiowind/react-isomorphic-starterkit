import request from 'axios';

export const HOME_GET = 'HOME_GET';
export const HOME_GET_REQUEST = 'HOME_GET_REQUEST';
export const HOME_GET_SUCCESS = 'HOME_GET_SUCCESS';
export const HOME_GET_FAILURE = 'HOME_GET_FAILURE';
export const INVITE_GET = 'INVITE_GET';
export const INVITE_GET_REQUEST = 'INVITE_GET_REQUEST';
export const INVITE_GET_SUCCESS = 'INVITE_GET_SUCCESS';
export const INVITE_GET_FAILURE = 'INVITE_GET_FAILURE';

const config = require('../../server/config'); 

function isBrowser() {
  return typeof window !== 'undefined';
}
function getURL() {
  if(isBrowser()) {
    return '/winaward/a/';
  } else {
    return 'http://127.0.0.1:'+config.ports+config.appDomain+'/';
  }
}

export function fetchHome() {
  return {
    type: HOME_GET,
    promise: request.get(getURL()+'api/home')
  }
}

function shouldFetchHome(state) {
  // console.log('state.shop[data]',state);
  const lists = state.home.data;
  if (!lists) {
    return true;
  } else if (state.home.isFetching) {
    return false;
  } else {
    return false;
  }
}

export function fetchHomeIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchHome(getState())) {
      return dispatch(fetchHome());
    }
  };
}

export function fetchInvite({ uid }) {
  return {
    type: INVITE_GET,
    promise: request.get(getURL()+'api/invite/'+uid)
  }
}

function shouldFetchInivite(state) {
  // console.log('state.shop[data]',state.shop.detaildata);
  const lists = state.invite.data;
  if (!lists) {
    return true;
  } else if (state.invite.isFetching) {
    return false;
  } else {
    return false;  
  }
}

export function fetchInviteIfNeeded(uid) {
  return (dispatch, getState) => {
    if (shouldFetchInivite(getState())) {
      return dispatch(fetchInvite({uid:uid}));
    }
  };
}
