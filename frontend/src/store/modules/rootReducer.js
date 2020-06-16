import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import appointment from './appointment/reducer';

export default combineReducers({
  auth,
  user,
  appointment,
});