import request from 'axios';

export const SELECT_FIO = 'SELECT_FIO';
export const INVALIDATE_FIO = 'INVALIDATE_FIO';

export const LISTS_GET = 'LISTS_GET';
export const LISTS_GET_REQUEST = 'LISTS_GET_REQUEST';
export const LISTS_GET_SUCCESS = 'LISTS_GET_SUCCESS';
export const LISTS_GET_FAILURE = 'LISTS_GET_FAILURE';


export function invalidateFio(fio) {
  return {
    type: INVALIDATE_FIO,
    fio
  };
}

export function fetchLists(fio = 'fio') {
  return {
    type: LISTS_GET,
    fio:'fio',
    promise: request.get(`https://read.dianrong.com/api/news_list`)
  }
}

function shouldFetchLists(state, fio) {
  console.log('state.listsByFio[fio]',state);
  const lists = state.listsByFio.present.fio;
  // return false
  if (!lists) {
    return true;
  } else if (lists.isFetching) {
    return false;
  } else {
    return lists.didInvalidate;
  }
}

export function fetchListsIfNeeded(fio) {
  return (dispatch, getState) => {
    if (shouldFetchLists(getState(), fio)) {
      return dispatch(fetchLists(fio));
    }
  };
}
