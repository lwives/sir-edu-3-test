import { BASE_URL } from 'constants/configConstants'
import { CALL_API } from 'redux-api-middleware'
import studentService from 'services/student-service'

// ------------------------------------
// Constants
// ------------------------------------
export const SAVE_STUDENT_REQUEST = 'SAVE_STUDENT_REQUEST'
export const SAVE_STUDENT_SUCCESS = 'SAVE_STUDENT_RECEIVE'
export const SAVE_STUDENT_FAILURE = 'SAVE_STUDENT_FAILURE'
export const GET_STUDENTS_LIST_REQUEST = 'GET_STUDENTS_LIST_REQUEST'
export const GET_STUDENTS_LIST_SUCCESS = 'GET_STUDENTS_LIST_SUCCESS'
export const GET_STUDENTS_LIST_FAILURE = 'GET_STUDENTS_LIST_FAILURE'
// ------------------------------------
// Actions
// ------------------------------------
export function save(student) {
  return {
    type:  SAVE_STUDENT_REQUEST,
    payload: {
        isFetching: true,
    },
    meta: {
      student
    }
  }
}

// export function savedStudent() {
//   return {
//     type: SAVE_STUDENT_RECEIVE,
//     payload: (action, state) => ({ ...action.payload, isFetching: false })
//   }
// }

export function saveStudentError(message) {
  return {
    type: SAVE_STUDENT_FAILURE,
    payload: {
        isFetching: false,
        error: message
    }
  }
}

export function saveStudent(student) {
  let newStudent = new FormData();
  Object.keys(student).forEach((key)=>{ newStudent.append(key, student[key]) });
  return dispatch => {
    return studentService.saveStudent(newStudent).then((data) => {
        console.log('ai como é bom ser vida loca')
    }).catch((error) => {
        console.log('errrrro miseravi')
    })
  } 
  // return {
  //   [CALL_API]: {
  //     endpoint: BASE_URL + '/students',
  //     method: 'POST',
  //     headers: { 'Accept': 'application/json' },
  //     body: data,
  //     types: [save(student), SAVE_STUDENT_SUCCESS, SAVE_STUDENT_FAILURE]
  //   }
  // };
}

export function getStudentsList() {
    return dispatch => {
        return studentService.getStudents().then((res) => {
          console.log("aehooo")
        })
        .catch(() => {
          console.log('erroooooo')
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
  [SAVE_STUDENT_REQUEST] : (state, action) => ({ ...state, ...action.payload }),
  [SAVE_STUDENT_SUCCESS] : (state, action) => ({ ...state, isFetching: false, list: [...state.list, action.payload] }),
  [SAVE_STUDENT_FAILURE] : (state, action) => state
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function studentsReducer (state = {list: []}, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
