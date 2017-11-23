import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth';

function userReducer(state = {}, action) {
  switch (action.type) {
    case 'SIGN_UP':
      state = action.user;
      return state;
    default:
      return state;
  }
}

const combinedReducer = combineReducers({
  userReducer,
  form: formReducer,
  auth: authReducer,
});

export default combinedReducer;
