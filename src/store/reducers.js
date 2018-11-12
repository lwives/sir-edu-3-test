import { combineReducers } from 'redux'
import locationReducer from './location'
import loginReducer from './login';
import studentsReducer from './students'
import schoolsReducer from './schools'
import filesReducer from './files'
import judgementReducer from './judgement'
import adaptationsReducer from './adaptations'
import attendancesReducer from './attendances'
import plansReducer from './plans'
import usersReducer from './users' 

const appReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    auth: loginReducer,
    students: studentsReducer,
    schools: schoolsReducer,
    files : filesReducer,
    judgements: judgementReducer,
    adaptations: adaptationsReducer,
    attendances: attendancesReducer,
    plans: plansReducer,
    user: usersReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(appReducer(store.asyncReducers))
}

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer()(state, action)
}

export default rootReducer
