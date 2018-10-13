import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TaskListRow = ({ task, allPriorities }) => {
  const priority = (priorities, id) => {
    const namePriority = priorities.filter(p => p.id === id);
    if (namePriority.length) return namePriority[0].name;
    return null;
  };
  return (
    <tr>
      <td>
        <Link to={`/task/${task.id}`}>{task.name}</Link>
      </td>
      <td>{task.description}</td>
      <td>{priority(allPriorities, task.priorityId)}</td>
      <td>{task.sheduledDate ? moment(task.sheduledDate).format('DD.MM.YYYY HH:mm') : null}</td>
      <td>{task.finishDate ? moment(task.finishDate).format('DD.MM.YYYY HH:mm') : null}</td>
    </tr>
  );
};

TaskListRow.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  allPriorities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};

export default TaskListRow;
