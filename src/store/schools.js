import schoolService from 'services/school-service'
import router from 'helpers/router-helper';

// ------------------------------------
// Constants
// ------------------------------------
export const SAVE_SCHOOL_REQUEST = 'SAVE_SCHOOL_REQUEST'
export const SAVE_SCHOOL_SUCCESS = 'SAVE_SCHOOL_RECEIVE'
export const SAVE_SCHOOL_FAILURE = 'SAVE_SCHOOL_FAILURE'
export const GET_SCHOOLS_LIST_REQUEST = 'GET_SCHOOLS_LIST_REQUEST'
export const GET_SCHOOLS_LIST_SUCCESS = 'GET_SCHOOLS_LIST_SUCCESS'
export const GET_SCHOOLS_LIST_FAILURE = 'GET_SCHOOLS_LIST_FAILURE'
const FILTER_SCHOOLS = 'FILTER_SCHOOLS'
const SET_SELECTED_SCHOOL = 'SET_SELECTED_SCHOOL'
const GET_SCHOOL_RESQUEST = 'GET_SCHOOL_RESQUEST'
const GET_SCHOOL_SUCESS = 'GET_SCHOOL_SUCESS'
const GET_SCHOOL_FAILURE = 'GET_SCHOOL_FAILURE'

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

function modifiedSchool(school, run) {
  return dispatch => {
    dispatch(request(SAVE_SCHOOL_REQUEST));
    console.log(run);
    
    return run(school).then((res) => {
      dispatch(success(SAVE_SCHOOL_SUCCESS, 'school', res.data));

      router.goToSchoolsPage();
    }).catch((error) => {
      dispatch(failure(SAVE_SCHOOL_FAILURE));
      console.log('SAVE_SCHOOL_FAILURE', error);
    })
  }
}

export function insertSchool(school) {
  const runFunction = schoolService.insertSchool
  console.log(runFunction);
  
  modifiedSchool(school, runFunction)
}
export function editSchool(school) {
  const runFunction = schoolService.editSchool
  modifiedSchool(school, runFunction)
}
export function deleteSchool(school) {
  const runFunction = schoolService.deleteSchool
  modifiedSchool(school, runFunction)
}

export function getSchoolsList() {
  return dispatch => {
    dispatch(request(GET_SCHOOLS_LIST_REQUEST))
    return schoolService.getSchools().then((res) => {
      dispatch(success(GET_SCHOOLS_LIST_SUCCESS, 'list', res.data));
    })
      .catch((error) => {
        dispatch(failure(GET_SCHOOLS_LIST_FAILURE))
        console.log('GET_SCHOOLS_LIST_FAILURE', error);
      });
  }
}

export function filterSchools(filterText) {
  return {
    type: FILTER_SCHOOLS,
    payload: {
      filterText
    }
  }
}

export function setSelectedSchool(school) {
  return {
    type: SET_SELECTED_SCHOOL,
    payload: {
      school
    }
  }
}

export function getSchool(idShow) {
  return dispatch => {
    dispatch(request(GET_SCHOOL_RESQUEST))
    return schoolService.getStudent(idShow).then((res) => {
      dispatch(success(GET_SCHOOL_SUCESS, 'school', res.data));
    })
      .catch((err) => {
        dispatch(failure(GET_SCHOOL_FAILURE, ''))
        console.log('GET_SCHOOL_FAILURE', err);
      });
  }
}

export const actions = {
  SAVE_SCHOOL_REQUEST,
  SAVE_SCHOOL_SUCCESS,
  SAVE_SCHOOL_FAILURE
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SAVE_SCHOOL_REQUEST]: (state, action) => ({ ...state, ...action.payload }),
  [SAVE_SCHOOL_SUCCESS]: (state, action) => ({ ...state, isFetching: false, list: [...state.list, action.payload.school] }),
  [SAVE_SCHOOL_FAILURE]: (state, action) => ({ ...state, ...action.payload }),
  [GET_SCHOOLS_LIST_REQUEST]: (state, action) => state,
  [GET_SCHOOLS_LIST_SUCCESS]: (state, action) => ({ ...state, ...action.payload }),
  [GET_SCHOOLS_LIST_FAILURE]: (state, action) => state,
  [FILTER_SCHOOLS]: (state, action) => ({ ...state, ...action.payload }),
  [SET_SELECTED_SCHOOL]: (state, action) => ({ ...state, selectedSchool: action.payload.school }),
  [GET_SCHOOL_RESQUEST]: (state, action) => ({ ...state, ...action.payload }),
  [GET_SCHOOL_SUCESS]: (state, action) => ({ ...state, ...action.payload }),
  [GET_SCHOOL_FAILURE]: (state, action) => ({ ...state, ...action.payload })
}

const initialState = {
  isFetching: false,
  list: [],
  filterText: '',
  selectedSchool: {},
  school: {}
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function SchoolsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
