import request from 'superagent';

export const SHOP_LISTS_GET = 'SHOP_LISTS_GET';
export const SHOP_LISTS_GET_REQUEST = 'SHOP_LISTS_GET_REQUEST';
export const SHOP_LISTS_GET_SUCCESS = 'SHOP_LISTS_GET_SUCCESS';
export const SHOP_LISTS_GET_FAILURE = 'SHOP_LISTS_GET_FAILURE';
export const SHOP_DETAIL_GET = 'SHOP_DETAIL_GET';
export const SHOP_DETAIL_GET_REQUEST = 'SHOP_DETAIL_GET_REQUEST';
export const SHOP_DETAIL_GET_SUCCESS = 'SHOP_DETAIL_GET_SUCCESS';
export const SHOP_DETAIL_GET_FAILURE = 'SHOP_DETAIL_GET_FAILURE';
export const SHOP_LISTS_ADD = 'SHOP_LISTS_ADD';
export const SHOP_LISTS_ADD_REQUEST = 'SHOP_LISTS_ADD_REQUEST';
export const SHOP_LISTS_ADD_SUCCESS = 'SHOP_LISTS_ADD_SUCCESS';
export const SHOP_LISTS_ADD_FAILURE = 'SHOP_LISTS_ADD_FAILURE';

function isBrowser() {
  return typeof window !== 'undefined';
}
function getURL() {
  if(isBrowser()) {
    return '/';
  } else {
    return 'http://127.0.0.1:3002/'
  }
}

export function fetchShopLists(fio = 'fio') {
  return {
    type: SHOP_LISTS_GET,
    promise: request.get(getURL() + 'api/hot')
  }
}

function shouldFetchShopLists(state) {
  // console.log('state.shop[data]',state);
  const lists = state.shop.data;
  if (!lists) {
    return true;
  } else if (state.shop.isFetching) {
    return false;
  } else {
    return false;
  }
}

export function fetchShopListsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchShopLists(getState())) {
      return dispatch(fetchShopLists());
    }
  };
}

export function fetchShopDetail({ pid }) {
  return {
    type: SHOP_DETAIL_GET,
    promise: request.get(getURL() + 'api/detail/'+pid)
  }
}

function shouldFetchShopDetail(state, pid) {
  // console.log('state.shop[data]',state.shop.detaildata);
  const detail = state.shop.detaildata;
  if (!detail) {
    return true;
  } else if (state.shop.isFetching) {
    return false;
  } else {
    if(detail.product_id==pid){
      return false;
    }else{
      return true;
    }
  }
}

export function fetchShopDetailIfNeeded(pid) {
  return (dispatch, getState) => {
    if (shouldFetchShopDetail(getState(), pid)) {
      return dispatch(fetchShopDetail({pid:pid}));
    }
  };
}

export function addShopList(page) {
  return {
    type: SHOP_LISTS_ADD,
    promise: request.get(getURL() + 'api/hot?page='+page)
  }
}