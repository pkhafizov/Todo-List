import * as types from './actionTypes';
import taskApi from '../api/taskApi';

export function loadTasksSuccess(tasks) {
  return { type: types.LOAD_TASKS_SUCCESS, tasks };
}

export function loadTasksByPSuccess(tasks) {
  return { type: types.LOAD_TASKSBYP_SUCCESS, tasks };
}

export function createTaskSuccess(task) {
  return { type: types.CREATE_TASK_SUCCESS, task };
}

export function updateTaskSuccess(task) {
  return { type: types.UPDATE_TASK_SUCCESS, task };
}

export function deleteTaskSuccess(id) {
  return { type: types.DELETE_TASK_SUCCESS, id };
}

export function loadTasks() {
  return function disp(dispatch) {
    return taskApi
      .getAllTasks()
      .then((tasks) => {
        dispatch(loadTasksSuccess(tasks));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function loadTasksByPriority(priorityId) {
  return function disp(dispatch) {
    return taskApi
      .getTasksByPriority(priorityId)
      .then((tasks) => {
        dispatch(loadTasksByPSuccess(tasks));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveTask(task) {
  return function disp(dispatch) {
    return taskApi
      .saveTask(task)
      .then((savedTask) => {
        if (task.id) {
          dispatch(updateTaskSuccess(savedTask));
        } else {
          dispatch(createTaskSuccess(savedTask));
        }
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteTask(id) {
  return function disp(dispatch) {
    return taskApi
      .deleteTask(id)
      .then((deletedId) => {
        dispatch(deleteTaskSuccess(deletedId));
      })
      .catch((error) => {
        throw error;
      });
  };
}
