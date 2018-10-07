import React from 'react';
import PropTypes from 'prop-types';
import TaskListRow from './TaskListRow';

const TaskList = ({ tasks }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Название</th>
        <th>Описание</th>
        <th>Важность</th>
        <th>План</th>
        <th>Выполнено</th>
      </tr>
    </thead>
    <tbody>{tasks.map(task => <TaskListRow key={task.id} task={task} />)}</tbody>
  </table>
);

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired })).isRequired,
};

export default TaskList;
