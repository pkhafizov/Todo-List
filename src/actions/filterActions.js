import * as types from './actionTypes';

export function tasksByPriority(priorityId) {
  return { type: types.TASKS_BY_PRIORITY, priorityId };
}

export function tasksByP(priorityId) {
  return function disp(dispatch) {
    dispatch(tasksByPriority(priorityId));
  };
}
