import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskActions from '../../actions/taskActions';
import TaskList from './TaskList';
import history from '../../history';

class TasksPage extends React.Component {
  constructor(props) {
    super(props);

    this.history = history;

    this.redirectToAddTaskPage = this.redirectToAddTaskPage.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  redirectToAddTaskPage() {
    this.history.push('/task');
  }

  deleteTask(id) {
    const { actions } = this.props;
    actions.deleteTask(id);
  }

  render() {
    const { tasks } = this.props;
    const { priorities } = this.props;
    return (
      <div>
        <h1>Задачи</h1>
        <input
          type="submit"
          value="Добавить Задачу"
          className="btn btn-primary"
          onClick={this.redirectToAddTaskPage}
        />
        <TaskList tasks={tasks} allPriorities={priorities} onDelete={this.deleteTask} />
      </div>
    );
  }
}

TasksPage.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired })).isRequired,
  priorities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  actions: PropTypes.shape({}).isRequired,
};

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    priorities: state.priorities,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(taskActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
