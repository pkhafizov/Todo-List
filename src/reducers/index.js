import { combineReducers } from 'redux';
import tasks from './taskReducer';
import priorities from './priorityReducer';

const rootReducer = combineReducers({
  tasks,
  priorities,
});

export default rootReducer;
