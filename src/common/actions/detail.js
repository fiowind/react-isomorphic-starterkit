import request from 'axios';

export const DETAIL_GET = 'DETAIL_GET';
export const DETAIL_GET_REQUEST = 'DETAIL_GET_REQUEST';
export const DETAIL_GET_SUCCESS = 'DETAIL_GET_SUCCESS';
export const DETAIL_GET_FAILURE = 'DETAIL_GET_FAILURE';
export const DETAIL_DELETE = 'DETAIL_DELETE';



export function invalidateDetail() {
  return {
    type: INVALIDATE_FIO,
    cio:'cio'
  };
}


export function fetchDetail({ id }) {
  console.log( 'readOne >id: ', id, ' >arguments: ', arguments );
  return {
    type: DETAIL_GET,
    cio:'cio',
    promise: request.get('https://read.dianrong.com/api/detail',{
      params:{id:id}
    })
  }
}

function shouldFetchDetail(state,id) {
  console.log('state.getDetail[data]',state.getDetail.present.cio);
  const detail = state.getDetail.present.cio;
  // return false

  if (!detail) {
    console.log('1');
    return true;
  } else if (detail.isFetching) {
    console.log('2');
    return false;
  } else{
    console.log('3');
    if(detail.detaildata.pk_id==id){
      return false;
    }else{
      return true;
    }
  }
}
function shouldDeleteDetail(state,id) {
  const detail = state.getDetail.present.cio;
  // return false
  if (detail.detaildata.pk_id == id) {
    return false;
  } else {
    return true;
  }
}
function deleteDetail(){
  return{
    type: DETAIL_DELETE,
    cio:'cio'
  }
}

export function fetchDetailIfNeeded(id) {
  return (dispatch, getState) => {
    if (shouldFetchDetail(getState(),id)) {
      return dispatch(fetchDetail({id:id}));
    }
  };
}

export function deleteDetailIfNeeded(id) {
  return (dispatch, getState) => {
    if (fetchDetailIfNeeded(getState(), id)) {
      console.log('gointo deleteDetail');
      return dispatch(deleteDetail());
    }
  };
}