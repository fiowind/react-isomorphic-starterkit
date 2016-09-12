import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import undoable from 'redux-undo';

import user from './user';
import layout from './layout';
import version from './version';
import { listsByFio } from './fio';
import { getDetail }  from './detail';
import { shop } from './shop';

const rootReducer = combineReducers({
  user : user,
  version : version,
  layout : undoable(layout),
  listsByFio : undoable(listsByFio),
  getDetail : undoable(getDetail),
  shop : shop,
  router : routerStateReducer
});

export default rootReducer;