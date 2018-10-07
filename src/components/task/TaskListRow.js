import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const CourseListRow = ({ task }) => (
  <tr>
    <td>
      <Link to={`/task/${task.id}`}>{task.name}</Link>
    </td>
    <td>{task.description}</td>
    <td>{task.priorityId}</td>
    <td>{task.sheduledDate}</td>
    <td>{task.finishDate}</td>
  </tr>
);

CourseListRow.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default CourseListRow;
