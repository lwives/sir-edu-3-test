import planService from 'services/plan-service'
import router from 'helpers/router-helper';

// ------------------------------------
// Constants
// ------------------------------------
const SAVE_PLAN_REQUEST = 'SAVE_PLAN_REQUEST'
const SAVE_PLAN_SUCCESS = 'SAVE_PLAN_RECEIVE'
const SAVE_PLAN_FAILURE = 'SAVE_PLAN_FAILURE'
const GET_PLANS_LIST_REQUEST = 'GET_PLANS_LIST_REQUEST'
const GET_PLANS_LIST_SUCCESS = 'GET_PLANS_LIST_SUCCESS'
const GET_PLANS_LIST_FAILURE = 'GET_PLANS_LIST_FAILURE'
const FILTER_PLANS = 'FILTER_PLANS'
const SET_SELECTED_PLAN = 'SET_SELECTED_PLAN'
const GET_PLAN_RESQUEST = 'GET_PLAN_RESQUEST'
const GET_PLAN_SUCESS = 'GET_PLAN_SUCESS'
const GET_PLAN_FAILURE = 'GET_PLAN_FAILURE'

// ------------------------------------
// Actions
// ------------------------------------
export function request(type) {
  return {
    type: type,
    payload: {
      isFetching: true
    }
  }
}

export function success(type, key, content) {
  return {
    type: type,
    payload: {
      isFetching: false,
      [key]: content
    }
  }
}

function failure(type, message) {
  return {
    type: type,
    payload: {
      isFetching: false,
      message
    }
  }
}

export function insertPlan(plan) {
  return dispatch => {
    dispatch(request(SAVE_PLAN_REQUEST));
    return planService.insertPlan(plan).then((res) => {
      dispatch(success(SAVE_PLAN_SUCCESS, 'plan', res.data));
      
      router.goToStudentMenuPage();
    }).catch((error) => {
      dispatch(failure(SAVE_PLAN_FAILURE))
      console.log('SAVE_PLAN_FAILURE', error);
    })
  }
}

export function editPlan(plan) {
  return dispatch => {
    dispatch(request(SAVE_PLAN_REQUEST));
    return planService.editPlan(plan).then((res) => {
      dispatch(success(SAVE_PLAN_SUCCESS, 'plan', res.data));
      
      router.goToStudentMenuPage();
    }).catch((error) => {
      dispatch(failure(SAVE_PLAN_FAILURE))
      console.log('SAVE_PLAN_FAILURE', error);
    })
  }
}

export function deletePlan(plan) {
  return dispatch => {
    dispatch(request(SAVE_PLAN_REQUEST));
    return planService.deletePlan(plan).then((res) => {
      dispatch(success(SAVE_PLAN_SUCCESS, 'plan', res.data));
      
      router.goToStudentMenuPage();
    }).catch((error) => {
      dispatch(failure(SAVE_PLAN_FAILURE))
      console.log('SAVE_PLAN_FAILURE', error);
    })
  }
}

export function getPlansList() {
    return dispatch => {
        dispatch(request(GET_PLANS_LIST_REQUEST))
        return planService.getPlans().then((res) => {
          dispatch(success(GET_PLANS_LIST_SUCCESS, 'list', res.data));
        })
        .catch((error) => {
          dispatch(failure(GET_PLANS_LIST_FAILURE))
          console.log('GET_PLANS_LIST_FAILURE', error);
        });
    }
}

export function filterPlans(filterText) {
  return {
    type: FILTER_PLANS,
    payload: {
      filterText
    }
  }
}

export function setSelectedPlan(plan) {
  return {
    type: SET_SELECTED_PLAN,
    payload: {
      plan
    }
  }
}

export function getPlan(idShow) {
  return dispatch => {
    dispatch(request(GET_PLAN_RESQUEST))
    return planService.getPlan(idShow).then((res) => {
      dispatch(success(GET_PLAN_SUCESS, 'plan', res.data));
    })
      .catch((err) => {
        dispatch(failure(GET_PLAN_FAILURE, ''))
        console.log('GET_PLAN_FAILURE', err);
      });
  }
}

export const actions = {
  SAVE_PLAN_REQUEST,
  SAVE_PLAN_SUCCESS,
  SAVE_PLAN_FAILURE
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SAVE_PLAN_REQUEST]: (state, action) => ({ ...state, ...action.payload }),
  [SAVE_PLAN_SUCCESS]: (state, action) => ({ ...state, isFetching: false, list: [...state.list, action.payload.plan] }),
  [SAVE_PLAN_FAILURE]: (state, action) => ({ ...state, ...action.payload }),
  [GET_PLANS_LIST_REQUEST]: (state, action) => state,
  [GET_PLANS_LIST_SUCCESS]: (state, action) => ({ ...state, ...action.payload }),
  [GET_PLANS_LIST_FAILURE]: (state, action) => state,
  [FILTER_PLANS]: (state, action) => ({ ...state, ...action.payload }),
  [SET_SELECTED_PLAN]: (state, action) => ({ ...state, selectedPlan: action.payload.plan }),
  [GET_PLAN_RESQUEST]: (state, action) => ({ ...state, ...action.payload }),
  [GET_PLAN_SUCESS]: (state, action) => ({ ...state, ...action.payload }),
  [GET_PLAN_FAILURE]: (state, action) => ({ ...state, ...action.payload })
}

const initialState = {
  isFetching: false,
  list: [],
  filterText: '',
  selectedPlan: {}, 
  plan: {}
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function plansReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
