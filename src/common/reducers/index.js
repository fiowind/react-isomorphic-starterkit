import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import undoable from 'redux-undo';

import user from './user';
import layout from './layout';
import version from './version';
import { invite }  from './invite';
import { home } from './home';

const rootReducer = combineReducers({
  user : user,
  version : version,
  layout : undoable(layout),
  home : home,
  invite : invite,
  routing : routerReducer
});

export default rootReducer;