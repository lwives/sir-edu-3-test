import studentService from 'services/student-service'
import router from 'helpers/router-helper';

// ------------------------------------
// Constants
// ------------------------------------
const SAVE_STUDENT_REQUEST = 'SAVE_STUDENT_REQUEST'
const SAVE_STUDENT_SUCCESS = 'SAVE_STUDENT_RECEIVE'
const SAVE_STUDENT_FAILURE = 'SAVE_STUDENT_FAILURE'
const GET_STUDENTS_LIST_REQUEST = 'GET_STUDENTS_LIST_REQUEST'
const GET_STUDENTS_LIST_SUCCESS = 'GET_STUDENTS_LIST_SUCCESS'
const GET_STUDENTS_LIST_FAILURE = 'GET_STUDENTS_LIST_FAILURE'
const FILTER_STUDENTS = 'FILTER_STUDENTS'
const SET_SELECTED_STUDENT = 'SET_SELECTED_STUDENT'
const GET_STUDENT_RESQUEST = 'GET_STUDENT_RESQUEST'
const GET_STUDENT_SUCESS = 'GET_STUDENT_SUCESS'
const GET_STUDENT_FAILURE = 'GET_STUDENT_FAILURE'

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

export function saveStudent(student) {
  return dispatch => {
    dispatch(request(SAVE_STUDENT_REQUEST));
    return studentService.saveStudent(student).then((res) => {
      dispatch(success(SAVE_STUDENT_SUCCESS, 'student', res.data));
      
      router.goToStudentsPage();
    }).catch((error) => {
      dispatch(failure(SAVE_STUDENT_FAILURE))
      console.log('SAVE_STUDENT_FAILURE', error);
    })
  }
}

export function getStudentsList() {
    return dispatch => {
        dispatch(request(GET_STUDENTS_LIST_REQUEST))
        return studentService.getStudents().then((res) => {
          dispatch(success(GET_STUDENTS_LIST_SUCCESS, 'list', res.data));
        })
        .catch((error) => {
          dispatch(failure(GET_STUDENTS_LIST_FAILURE))
          console.log('GET_STUDENTS_LIST_FAILURE', error);
        });
    }
}

export function filterStudents(filterText) {
  return {
    type: FILTER_STUDENTS,
    payload: {
      filterText
    }
  }
}

export function setSelectedStudent(student) {
  return {
    type: SET_SELECTED_STUDENT,
    payload: {
      student
    }
  }
}

export function getStudent(idShow) {
  return dispatch => {
    dispatch(request(GET_STUDENT_RESQUEST))
    return studentService.getStudent(idShow).then((res) => {
      dispatch(success(GET_STUDENT_SUCESS, 'student', res.data));
    })
      .catch((err) => {
        dispatch(failure(GET_STUDENT_FAILURE, ''))
        console.log('GET_STUDENT_FAILURE', err);
      });
  }
}

export const actions = {
  SAVE_STUDENT_REQUEST,
  SAVE_STUDENT_SUCCESS,
  SAVE_STUDENT_FAILURE
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SAVE_STUDENT_REQUEST]: (state, action) => ({ ...state, ...action.payload }),
  [SAVE_STUDENT_SUCCESS]: (state, action) => ({ ...state, isFetching: false, list: [...state.list, action.payload.student] }),
  [SAVE_STUDENT_FAILURE]: (state, action) => ({ ...state, ...action.payload }),
  [GET_STUDENTS_LIST_REQUEST]: (state, action) => state,
  [GET_STUDENTS_LIST_SUCCESS]: (state, action) => ({ ...state, ...action.payload }),
  [GET_STUDENTS_LIST_FAILURE]: (state, action) => state,
  [FILTER_STUDENTS]: (state, action) => ({ ...state, ...action.payload }),
  [SET_SELECTED_STUDENT]: (state, action) => ({ ...state, selectedStudent: action.payload.student }),
  [GET_STUDENT_RESQUEST]: (state, action) => ({ ...state, ...action.payload }),
  [GET_STUDENT_SUCESS]: (state, action) => ({ ...state, ...action.payload }),
  [GET_STUDENT_FAILURE]: (state, action) => ({ ...state, ...action.payload })
}

const initialState = {
  isFetching: false,
  list: [],
  filterText: '',
  selectedStudent: {}, 
  student: {}
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function studentsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
