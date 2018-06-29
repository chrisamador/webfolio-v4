// @flow
import initState from '../initState';

const UPDATE_WORKS_DATA_SUCCESS = 'UPDATE_WORKS_DATA_SUCCESS',
  LOAD_WORKS_DATA_SUCCESS = 'LOAD_WORKS_DATA_SUCCESS';

// REDUCER
export default function worksReducer(state = initState.works, action){
  switch(action.type){
    case UPDATE_WORKS_DATA_SUCCESS:
      return Object.assign({}, state, action.data);
    case LOAD_WORKS_DATA_SUCCESS:
      return Object.assign({}, action.data);
    default:
      return state;
  }
}

// ACTIONS
export class WorksStateActions {
  static updateUserDataSuccess = (userData) => ({
    type: UPDATE_WORKS_DATA_SUCCESS,
    data: userData,
  })
  static loadUserDataSuccess = (userData) => ({
    type: LOAD_WORKS_DATA_SUCCESS,
    data: userData,
  })
}
