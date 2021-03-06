import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import authReducer from './auth'
import userReducer from './user'
import allUserReducer from './allAccount'
import getTestList from './test-reducer'
import newQuestion from './takeTest-reducer'
import resultReducer from './result'
import testManagement from './test-management'
import allResultReducer from './allResult'


const combinedReducer = combineReducers({
  user: userReducer,
  result: resultReducer,
  form: formReducer,
	auth: authReducer,
	router: routerReducer,
  test: getTestList,
  takeTest: newQuestion,
  testManagement: testManagement,
  allResult: allResultReducer,
  allAccount: allUserReducer,
})

export default combinedReducer
