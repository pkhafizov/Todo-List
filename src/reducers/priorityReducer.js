import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function priorityReducer(state = initialState.priorities, action) {
  switch (action.type) {
    case types.LOAD_PRIORITIES_SUCCESS:
      return action.priorities;
    default:
      return state;
  }
}
