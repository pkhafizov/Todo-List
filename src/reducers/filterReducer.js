import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function filterReducer(state = initialState.filter, action) {
  switch (action.type) {
    case types.TASKS_BY_PRIORITY:
      return action.priorityId;
    default:
      return state;
  }
}
