import {
  HOME_GET, HOME_GET_REQUEST, HOME_GET_SUCCESS, HOME_GET_FAILURE,
} from '../actions';


export function home(state = { }, action) {
  switch (action.type) {
  case HOME_GET_REQUEST:
    console.log('HOME_GET_REQUEST');
    return Object.assign({}, state, {
      type: action.type, 
      isFetching: true
    });
  case HOME_GET_SUCCESS:
    console.log('HOME_GET_SUCCESS');
    return Object.assign({}, state, {
      type: action.type, 
      data: action.req.data.data,
      isFetching: false,
      lastUpdated: Date.now(),
    });
  case HOME_GET_FAILURE:
    console.log('HOME_GET_FAILURE');
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