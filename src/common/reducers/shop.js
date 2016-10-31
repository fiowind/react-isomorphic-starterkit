import {
  SHOP_LISTS_GET, SHOP_LISTS_GET_REQUEST, SHOP_LISTS_GET_SUCCESS, SHOP_LISTS_GET_FAILURE,
  SHOP_DETAIl_GET, SHOP_DETAIL_GET_REQUEST, SHOP_DETAIL_GET_SUCCESS, SHOP_DETAIL_GET_FAILURE,
  SHOP_LISTS_ADD, SHOP_LISTS_ADD_REQUEST, SHOP_LISTS_ADD_SUCCESS, SHOP_LISTS_ADD_FAILURE,
} from '../actions/shop';


export function shop(state = { }, action) {
  switch (action.type) {
  case SHOP_LISTS_GET_REQUEST:
    console.log('SHOP_LISTS_GET_REQUEST');
    return Object.assign({}, state, {
      type: action.type, 
      isFetching: true
    });
  case SHOP_LISTS_GET_SUCCESS:
    console.log('SHOP_LISTS_GET_SUCCESS');
    console.log(action);
    return Object.assign({}, state, {
      type: action.type, 
      data: action.req.body.data,
      isFetching: false,
      lastUpdated: Date.now(),
    });
  case SHOP_LISTS_GET_FAILURE:
    console.log('SHOP_LISTS_GET_FAILURE');
    return Object.assign({}, state, { 
      type: action.type,
      data: {},
      isFetching: false,
      error : {
        status: action.error.status,
        statusText : action.error.statusText
      }
    });
  case SHOP_DETAIL_GET_REQUEST:
    console.log('SHOP_DETAIL_GET_REQUEST');
    return Object.assign({}, state, {
      type: action.type, 
      isFetching: true
    });
  case SHOP_DETAIL_GET_SUCCESS:
    console.log('SHOP_DETAIL_GET_SUCCESS');
    return Object.assign({}, state, {
      type: action.type, 
      detaildata: action.req.body.data,
      isFetching: false,
      lastUpdated: Date.now(),
    });
  case SHOP_DETAIL_GET_FAILURE:
    console.log('SHOP_DETAIL_GET_FAILURE');
    return Object.assign({}, state, { 
      type: action.type,
      detaildata: {},
      isFetching: false,
      error : {
        status: action.error.status,
        statusText : action.error.statusText
      }
    });
  case SHOP_LISTS_ADD_REQUEST:
    console.log('SHOP_LISTS_ADD_REQUEST');
    return Object.assign({}, state, {
      type: action.type, 
      ispageFetching: true
    });
  case SHOP_LISTS_ADD_SUCCESS:
    console.log('SHOP_LISTS_ADD_SUCCESS');
    if(action.req.body.data==null){
      return state;
    }
    return Object.assign({}, state, {
      type: action.type, 
      data: state.data.concat(action.req.body.data),
      ispageFetching: false,
      lastUpdated: Date.now(),
    });
  case SHOP_LISTS_ADD_FAILURE:
    console.log('SHOP_LISTS_ADD_FAILURE');
    return Object.assign({}, state, { 
      type: action.type,
      data: {},
      ispageFetching: false,
      error : {
        status: action.error.status,
        statusText : action.error.statusText
      }
    });
  default:
    return state;
  }
}