import attendanceService from 'services/attendance-service'
import router from 'helpers/router-helper';

// ------------------------------------
// Constants
// ------------------------------------
const SAVE_ATTENDANCE_REQUEST = 'SAVE_ATTENDANCE_REQUEST'
const SAVE_ATTENDANCE_SUCCESS = 'SAVE_ATTENDANCE_RECEIVE'
const SAVE_ATTENDANCE_FAILURE = 'SAVE_ATTENDANCE_FAILURE'
const GET_ATTENDANCES_LIST_REQUEST = 'GET_ATTENDANCES_LIST_REQUEST'
const GET_ATTENDANCES_LIST_SUCCESS = 'GET_ATTENDANCES_LIST_SUCCESS'
const GET_ATTENDANCES_LIST_FAILURE = 'GET_ATTENDANCES_LIST_FAILURE'
const FILTER_ATTENDANCES = 'FILTER_ATTENDANCES'
const SET_SELECTED_ATTENDANCE = 'SET_SELECTED_ATTENDANCE'
const GET_ATTENDANCE_RESQUEST = 'GET_ATTENDANCE_RESQUEST'
const GET_ATTENDANCE_SUCESS = 'GET_ATTENDANCE_SUCESS'
const GET_ATTENDANCE_FAILURE = 'GET_ATTENDANCE_FAILURE'

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

export function insertAttendance(attendance) {
  return dispatch => {
    dispatch(request(SAVE_ATTENDANCE_REQUEST));
    return attendanceService.insertAttendance(attendance).then((res) => {
      dispatch(success(SAVE_ATTENDANCE_SUCCESS, 'attendance', res.data));
      
      router.goToStudentMenuPage();
    }).catch((error) => {
      dispatch(failure(SAVE_ATTENDANCE_FAILURE))
      console.log('SAVE_ATTENDANCE_FAILURE', error);
    })
  }
}

export function editAttendance(attendance) {
  return dispatch => {
    dispatch(request(SAVE_ATTENDANCE_REQUEST));
    return attendanceService.editAttendance(attendance).then((res) => {
      dispatch(success(SAVE_ATTENDANCE_SUCCESS, 'attendance', res.data));
      
      router.goToStudentMenuPage();
    }).catch((error) => {
      dispatch(failure(SAVE_ATTENDANCE_FAILURE))
      console.log('SAVE_ATTENDANCE_FAILURE', error);
    })
  }
}

export function deleteAttendance(attendance) {
  return dispatch => {
    dispatch(request(SAVE_ATTENDANCE_REQUEST));
    return attendanceService.deleteAttendance(attendance).then((res) => {
      dispatch(success(SAVE_ATTENDANCE_SUCCESS, 'attendance', res.data));
      
      router.goToStudentMenuPage();
    }).catch((error) => {
      dispatch(failure(SAVE_ATTENDANCE_FAILURE))
      console.log('SAVE_ATTENDANCE_FAILURE', error);
    })
  }
}

export function getAttendances(studentId) {
    return dispatch => {
        dispatch(request(GET_ATTENDANCES_LIST_REQUEST))
        return attendanceService.getAttendances(studentId).then((res) => {
          dispatch(success(GET_ATTENDANCES_LIST_SUCCESS, 'list', res.data));
        })
        .catch((error) => {
          dispatch(failure(GET_ATTENDANCES_LIST_FAILURE))
          console.log('GET_ATTENDANCES_LIST_FAILURE', error);
        });
    }
}

export function filterAttendances(filterText) {
  return {
    type: FILTER_ATTENDANCES,
    payload: {
      filterText
    }
  }
}

export function setSelectedAttendance(attendance) {
  return {
    type: SET_SELECTED_ATTENDANCE,
    payload: {
      attendance
    }
  }
}

export function getAttendance(idShow) {
  return dispatch => {
    dispatch(request(GET_ATTENDANCE_RESQUEST))
    return attendanceService.getAttendance(idShow).then((res) => {
      dispatch(success(GET_ATTENDANCE_SUCESS, 'attendance', res.data));
    })
      .catch((err) => {
        dispatch(failure(GET_ATTENDANCE_FAILURE, ''))
        console.log('GET_ATTENDANCE_FAILURE', err);
      });
  }
}

export const actions = {
  SAVE_ATTENDANCE_REQUEST,
  SAVE_ATTENDANCE_SUCCESS,
  SAVE_ATTENDANCE_FAILURE
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SAVE_ATTENDANCE_REQUEST]: (state, action) => ({ ...state, ...action.payload }),
  [SAVE_ATTENDANCE_SUCCESS]: (state, action) => ({ ...state, isFetching: false, list: [...state.list, action.payload.attendance] }),
  [SAVE_ATTENDANCE_FAILURE]: (state, action) => ({ ...state, ...action.payload }),
  [GET_ATTENDANCES_LIST_REQUEST]: (state, action) => state,
  [GET_ATTENDANCES_LIST_SUCCESS]: (state, action) => ({ ...state, ...action.payload }),
  [GET_ATTENDANCES_LIST_FAILURE]: (state, action) => state,
  [FILTER_ATTENDANCES]: (state, action) => ({ ...state, ...action.payload }),
  [SET_SELECTED_ATTENDANCE]: (state, action) => ({ ...state, selectedAttendance: action.payload.attendance }),
  [GET_ATTENDANCE_RESQUEST]: (state, action) => ({ ...state, ...action.payload }),
  [GET_ATTENDANCE_SUCESS]: (state, action) => ({ ...state, ...action.payload }),
  [GET_ATTENDANCE_FAILURE]: (state, action) => ({ ...state, ...action.payload })
}

const initialState = {
  isFetching: false,
  list: [],
  filterText: '',
  selectedAttendance: {}, 
  attendance: {}
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function attendancesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
