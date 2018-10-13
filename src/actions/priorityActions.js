import * as types from './actionTypes';
import taskApi from '../api/taskApi';

export function loadPrioritiesSuccess(priorities) {
  return { type: types.LOAD_PRIORITIES_SUCCESS, priorities };
}

export function loadPriorities() {
  return function disp(dispatch) {
    return taskApi
      .getAllPriorities()
      .then((priorities) => {
        dispatch(loadPrioritiesSuccess(priorities));
      })
      .catch((error) => {
        throw error;
      });
  };
}
