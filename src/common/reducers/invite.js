import {
  INVITE_GET, INVITE_GET_REQUEST, INVITE_GET_SUCCESS, INVITE_GET_FAILURE,
} from '../actions';


export function invite(state = { }, action) {
  switch (action.type) {
  case INVITE_GET_REQUEST:
    console.log('INVITE_GET_REQUEST');
    return Object.assign({}, state, {
      type: action.type, 
      isFetching: true
    });
  case INVITE_GET_SUCCESS:
    console.log('INVITE_GET_SUCCESS');
    return Object.assign({}, state, {
      type: action.type, 
      data: action.req.data,
      isFetching: false,
      lastUpdated: Date.now(),
    });
  case INVITE_GET_FAILURE:
    console.log('INVITE_GET_FAILURE');
    return Object.assign({}, state, { 
      type: action.type,
      data: {},
      isFetching: false,
      error : {
        status: action.error.status,
        statusText : action.error.statusText
      }
    });
  default:
    return state;
  }
}