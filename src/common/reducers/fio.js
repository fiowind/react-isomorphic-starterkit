import {
  INVALIDATE_FIO,
  LISTS_GET, LISTS_GET_REQUEST, LISTS_GET_SUCCESS, LISTS_GET_FAILURE
} from '../actions/fio';

function lists(state = {
  error: {},
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case INVALIDATE_FIO:
    return Object.assign({}, state, {
      didInvalidate: true
    }); 
  case LISTS_GET_REQUEST:
    console.log('LISTS_GET_REQUEST');
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });
  case LISTS_GET_SUCCESS:
    console.log('LISTS_GET_SUCCESS');
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items: action.lists,
      lastUpdated: action.receivedAt
    });
  case LISTS_GET_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false
    });
  default:
    return state;
  }
}


export function listsByFio(state = { }, action) {
  switch (action.type) {
  case INVALIDATE_FIO:
  case LISTS_GET_REQUEST:
  case LISTS_GET_SUCCESS:
    let listsArray = [];
    if(action.req ){
      console.log("action.req:::::::::::::::::::"+JSON.stringify(action.req));
      // let test = JSON.stringify(action.req);
      // console.log("listsArray:::::::::::::::::::"+typeof(JSON.stringify(action.req.body)));

      // let data = action.req.body;
      listsArray = action.req.text;
      console.log("actiontype:::::::::::::::::::"+action.fio);
    }
    // console.log('state[action.fio',state[action.fio]);
    return Object.assign({}, state, {
      [action.fio]: lists(state[action.fio], {
        type: action.type,
        fio: action.fio,
        lists: listsArray,
        receivedAt: Date.now()
      })
    });

  case LISTS_GET_FAILURE:
    return Object.assign({}, state, {
      [action.fio]: lists(state[action.fio], {
        type: action.type,
        fio: action.fio,
        lists: [],
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