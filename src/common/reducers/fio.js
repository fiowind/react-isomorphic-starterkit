import {
  INVALIDATE_FIO,
  LISTS_GET, LISTS_GET_REQUEST, LISTS_GET_SUCCESS, LISTS_GET_FAILURE
} from '../actions/fio';


export function listsByFio(state = { }, action) {
  switch (action.type) {
  case INVALIDATE_FIO:
    return Object.assign({}, state, {
      type: action.type, 
      didInvalidate: true
    }); 
  case LISTS_GET_REQUEST:
    console.log('LISTS_GET_REQUEST');
    return Object.assign({}, state, {
      type: action.type, 
      isFetching: true,
      didInvalidate: false
    });
  case LISTS_GET_SUCCESS:
    console.log('LISTS_GET_SUCCESS!');
    console.log(action);

    return Object.assign({}, state, {
      type: action.type, 
      isFetching: false,
      didInvalidate: false,
      items: JSON.parse(action.req.text),
      lastUpdated: action.receivedAt
    });
  case LISTS_GET_FAILURE:
    return Object.assign({}, state, {
      type: action.type, 
      isFetching: false,
      didInvalidate: false
    });
  default:
    return state;
  }
}
