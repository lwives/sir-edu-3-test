import adaptationService from 'services/adaptation-service'
import router from 'helpers/router-helper';

// ------------------------------------
// Constants
// ------------------------------------
const SAVE_ADAPTATION_REQUEST = 'SAVE_ADAPTATION_REQUEST'
const SAVE_ADAPTATION_SUCCESS = 'SAVE_ADAPTATION_RECEIVE'
const SAVE_ADAPTATION_FAILURE = 'SAVE_ADAPTATION_FAILURE'
const GET_ADAPTATIONS_LIST_REQUEST = 'GET_ADAPTATIONS_LIST_REQUEST'
const GET_ADAPTATIONS_LIST_SUCCESS = 'GET_ADAPTATIONS_LIST_SUCCESS'
const GET_ADAPTATIONS_LIST_FAILURE = 'GET_ADAPTATIONS_LIST_FAILURE'
const FILTER_ADAPTATIONS = 'FILTER_ADAPTATIONS'
const SET_SELECTED_ADAPTATION = 'SET_SELECTED_ADAPTATION'
const GET_ADAPTATION_RESQUEST = 'GET_ADAPTATION_RESQUEST'
const GET_ADAPTATION_SUCESS = 'GET_ADAPTATION_SUCESS'
const GET_ADAPTATION_FAILURE = 'GET_ADAPTATION_FAILURE'

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

export function insertAdaptation(adaptation) {
  return dispatch => {
    dispatch(request(SAVE_ADAPTATION_REQUEST));
    return adaptationService.insertAdaptation(adaptation).then((res) => {
      dispatch(success(SAVE_ADAPTATION_SUCCESS, 'adaptation', res.data));
      
      router.goToAdaptationsPage();
    }).catch((error) => {
      dispatch(failure(SAVE_ADAPTATION_FAILURE))
      console.log('SAVE_ADAPTATION_FAILURE', error);
    })
  }
}

export function editAdaptation(adaptation) {
  return dispatch => {
    dispatch(request(SAVE_ADAPTATION_REQUEST));
    return adaptationService.editAdaptation(adaptation).then((res) => {
      dispatch(success(SAVE_ADAPTATION_SUCCESS, 'adaptation', res.data));
      
      router.goToAdaptationsPage();
    }).catch((error) => {
      dispatch(failure(SAVE_ADAPTATION_FAILURE))
      console.log('SAVE_ADAPTATION_FAILURE', error);
    })
  }
}

export function deleteAdaptation(adaptation) {
  return dispatch => {
    dispatch(request(SAVE_ADAPTATION_REQUEST));
    return adaptationService.deleteAdaptation(adaptation).then((res) => {
      dispatch(success(SAVE_ADAPTATION_SUCCESS, 'adaptation', res.data));
      
      router.goToAdaptationsPage();
    }).catch((error) => {
      dispatch(failure(SAVE_ADAPTATION_FAILURE))
      console.log('SAVE_ADAPTATION_FAILURE', error);
    })
  }
}

export function getAdaptationsList() {
    return dispatch => {
        dispatch(request(GET_ADAPTATIONS_LIST_REQUEST))
        return adaptationService.getAdaptations().then((res) => {
          dispatch(success(GET_ADAPTATIONS_LIST_SUCCESS, 'list', res.data));
        })
        .catch((error) => {
          dispatch(failure(GET_ADAPTATIONS_LIST_FAILURE))
          console.log('GET_ADAPTATIONS_LIST_FAILURE', error);
        });
    }
}

export function filterAdaptations(filterText) {
  return {
    type: FILTER_ADAPTATIONS,
    payload: {
      filterText
    }
  }
}

export function setSelectedAdaptation(adaptation) {
  return {
    type: SET_SELECTED_ADAPTATION,
    payload: {
      adaptation
    }
  }
}

export function getAdaptation(idShow) {
  return dispatch => {
    dispatch(request(GET_ADAPTATION_RESQUEST))
    return adaptationService.getAdaptation(idShow).then((res) => {
      dispatch(success(GET_ADAPTATION_SUCESS, 'adaptation', res.data));
    })
      .catch((err) => {
        dispatch(failure(GET_ADAPTATION_FAILURE, ''))
        console.log('GET_ADAPTATION_FAILURE', err);
      });
  }
}

export const actions = {
  SAVE_ADAPTATION_REQUEST,
  SAVE_ADAPTATION_SUCCESS,
  SAVE_ADAPTATION_FAILURE
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SAVE_ADAPTATION_REQUEST]: (state, action) => ({ ...state, ...action.payload }),
  [SAVE_ADAPTATION_SUCCESS]: (state, action) => ({ ...state, isFetching: false, list: [...state.list, action.payload.adaptation] }),
  [SAVE_ADAPTATION_FAILURE]: (state, action) => ({ ...state, ...action.payload }),
  [GET_ADAPTATIONS_LIST_REQUEST]: (state, action) => state,
  [GET_ADAPTATIONS_LIST_SUCCESS]: (state, action) => ({ ...state, ...action.payload }),
  [GET_ADAPTATIONS_LIST_FAILURE]: (state, action) => state,
  [FILTER_ADAPTATIONS]: (state, action) => ({ ...state, ...action.payload }),
  [SET_SELECTED_ADAPTATION]: (state, action) => ({ ...state, selectedAdaptation: action.payload.adaptation }),
  [GET_ADAPTATION_RESQUEST]: (state, action) => ({ ...state, ...action.payload }),
  [GET_ADAPTATION_SUCESS]: (state, action) => ({ ...state, ...action.payload }),
  [GET_ADAPTATION_FAILURE]: (state, action) => ({ ...state, ...action.payload })
}

const initialState = {
  isFetching: false,
  list: [],
  filterText: '',
  selectedAdaptation: {}, 
  adaptation: {}
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function adaptationsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
