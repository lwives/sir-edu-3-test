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
// ------------------------------------
// Actions
// ------------------------------------
export function request(type) {
  return {
    type:  type,
    payload: {
        isFetching: true,
    }
  }
}

export function success(type, school) {
  return {
    type: type,
    payload: {
        isFetching: false,
        school
    }
  }
}

function failure(type, message) {
  return {
    type: type,
    payload: {
        isFetching: false,
    }
  }
}

export function saveSchool(school) {
  return dispatch => {
    dispatch(request(SAVE_SCHOOL_REQUEST));
    return SchoolService.saveSchool(school).then((res) => {
        dispatch(success(SAVE_SCHOOL_SUCCESS, res.data));
        router.goToSchoolsPage();
    }).catch((error) => {
        dispatch(failure(SAVE_SCHOOL_FAILURE));
    })
  } 
}

export function getSchoolListRequest() {
  return {
    type:  GET_SCHOOLS_LIST_REQUEST,
    payload: {
        isFetching: true,
    }
  }
}

export function getSchoolListSuccess(list) {
  return {
    type:  GET_SCHOOLS_LIST_SUCCESS,
    payload: {
        isFetching: false,
        list
    }
  }
}

export function getSchoolsList() {
    return dispatch => {
        dispatch(getSchoolListRequest())
        return SchoolService.getSchools().then((res) => {
          dispatch(getSchoolListSuccess(res.data));
        })
        .catch((err) => {
          dispatch(failure(GET_SCHOOLS_LIST_FAILURE))
        });
    }
}

export function filterSchools(filterText) {
    return {
      type:  FILTER_SCHOOLS,
      payload: {
          filterText
      }
    }
}

export function setSelectedSchool(school) {
    return {
      type:  SET_SELECTED_SCHOOL,
      payload: {
        school
      }
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
  [SAVE_SCHOOL_REQUEST] : (state, action) => ({ ...state, ...action.payload }),
  [SAVE_SCHOOL_SUCCESS] : (state, action) => ({ ...state, isFetching: false, list: [...state.list, action.payload.school] }),
  [SAVE_SCHOOL_FAILURE] : (state, action) => ({ ...state, ...action.payload }),
  [GET_SCHOOLS_LIST_REQUEST] : (state, action) => state,
  [GET_SCHOOLS_LIST_SUCCESS] : (state, action) => ({ ...state, ...action.payload }),
  [GET_SCHOOLS_LIST_FAILURE] : (state, action) => state,
  [FILTER_SCHOOLS] : (state, action) => ({ ...state, ...action.payload }),
  [SET_SELECTED_SCHOOL] : (state, action) => ({ ...state, selectedSchool: action.payload.school })
}

const initialState = {
  isFetching: false,
  list: [], 
  filterText: '',
  selectedSchool: {}
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function SchoolsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
