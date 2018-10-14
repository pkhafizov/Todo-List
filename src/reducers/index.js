import { combineReducers } from 'redux';
import tasks from './taskReducer';
import priorities from './priorityReducer';
import filter from './filterReducer';

const rootReducer = combineReducers({
  tasks,
  priorities,
  filter,
});

export default rootReducer;
