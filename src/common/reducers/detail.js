import {
  DETAIL_GET, DETAIL_GET_REQUEST, DETAIL_GET_SUCCESS, DETAIL_GET_FAILURE,DETAIL_DELETE
} from '../actions/detail';

function detail(state = {
  error: {},
  isFetching: false,
  detaildata: {}
}, action) {
  switch (action.type) {
  case DETAIL_GET_REQUEST:
    console.log('DETAIL_GET_REQUEST');
    return Object.assign({}, state, {
      isFetching: true,
    });
  case DETAIL_GET_SUCCESS:
    console.log('DETAIL_GET_SUCCESS');
    return Object.assign({}, state, {
      isFetching: false,
      detaildata: action.detaildata,
      receivedAt: action.receivedAt
    });
  case DETAIL_GET_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
    });
  default:
    return state;
  }
}


export function getDetail(state = { }, action) {
  switch (action.type) {
  case DETAIL_DELETE:
    return {};
  case DETAIL_GET_REQUEST:
  case DETAIL_GET_SUCCESS:
    let detaildata = {};
    if(action.req && action.req.data){
      detaildata = action.req.text;
    }
    console.log('state[action.cio]',action);
    return Object.assign({}, state, {
      [action.cio]: detail(state[action.cio], {
        type: action.type,
        cio: action.cio,
        detaildata: detaildata,
        receivedAt: Date.now()
      })
    });

  case DETAIL_GET_FAILURE:
    return Object.assign({}, state, {
      [action.cio]: detail(state[action.cio], {
        type: action.type,
        cio: action.cio,
        detaildata: {},
        receivedAt: Date.now(),
        error : {
          status: action.error.status,
          statusText : action.error.statusText
        }
      })
    });

  default:
    return state;
  }
}