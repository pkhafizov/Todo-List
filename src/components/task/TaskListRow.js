import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TaskListRow = ({ task, allPriorities, onDelete }) => {
  const priority = (priorities, id) => {
    const namePriority = priorities.filter(p => p.id === id);
    if (namePriority.length) return namePriority[0].name;
    return null;
  };
  const onClickDelete = () => {
    onDelete(task.id);
  };
  const trSelection = (sheduledDate, finishDate) => (moment(sheduledDate).isBefore(finishDate, 'minute') ? 'table-danger' : 'table-default');
  return (
    <tr className={trSelection(task.sheduledDate, task.finishDate)}>
      <td><button type="button" className="btn btn-outline-primary btn-sm" onClick={onClickDelete}>&#9932;</button></td>
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
  onDelete: PropTypes.func.isRequired,
};

export default TaskListRow;
