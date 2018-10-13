import React from 'react';
import PropTypes from 'prop-types';
import TaskListRow from './TaskListRow';

const TaskList = ({ tasks, allPriorities, onDelete }) => (
  <table className="table">
    <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Название</th>
        <th>Описание</th>
        <th>Приоритет</th>
        <th>План</th>
        <th>Выполнено</th>
      </tr>
    </thead>
    <tbody>
      {tasks.map(task => (
        <TaskListRow
          key={task.id}
          task={task}
          allPriorities={allPriorities}
          onDelete={onDelete}
        />
      ))}
    </tbody>
  </table>
);

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired })).isRequired,
  allPriorities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskList;
