// export default function clientMiddleware(client) {
//   return ({dispatch, getState}) => {
//     return next => action => {
//       if (typeof action === 'function') {
//         return action(dispatch, getState);
//       }

//       const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
//       if (!promise) {
//         return next(action);
//       }

//       const [REQUEST, SUCCESS, FAILURE] = types;
//       next({...rest, type: REQUEST});

//       const actionPromise = promise(client);
//       actionPromise.then(
//         (result) => next({...rest, result, type: SUCCESS}),
//         (error) => next({...rest, error, type: FAILURE})
//       ).catch((error)=> {
//         console.error('MIDDLEWARE ERROR:', error);
//         next({...rest, error, type: FAILURE});
//       });

//       return actionPromise;
//     };
//   };
// }

export default function clientMiddleware(cookies) {
  return ({dispatch, getState}) => {
    return next => action => {
      const { promise, type, ...rest } = action;
     
      if (!promise) return next(action);
     
      const SUCCESS = type + '_SUCCESS';
      const REQUEST = type + '_REQUEST';
      const FAILURE = type + '_FAILURE';
      next({ ...rest, type: REQUEST });
      return promise
        .set('Cookie', cookies)
        .then(req => {
          next({ ...rest, req, type: SUCCESS });
          return true;
        })
        .catch(error => {
          next({ ...rest, error, type: FAILURE });
          console.log(error);
          return false;
        });
     };
  };
}

// export default function clientMiddleware(cookies) {
//   return next => action => {
//     const { promise, type, ...rest } = action;
   
//     if (!promise) return next(action);
   
//     const SUCCESS = type + '_SUCCESS';
//     const REQUEST = type + '_REQUEST';
//     const FAILURE = type + '_FAILURE';
//     next({ ...rest, type: REQUEST });
//     return promise
//       .set('Cookie', 'a=application/json')
//       .then(req => {
//         next({ ...rest, req, type: SUCCESS });
//         return true;
//       })
//       .catch(error => {
//         next({ ...rest, error, type: FAILURE });
//         console.log(error);
//         return false;
//       });
//    };
// }