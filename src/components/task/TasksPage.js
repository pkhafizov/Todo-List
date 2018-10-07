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
  }

  redirectToAddCoursePage() {
    this.history.push('/task');
  }

  render() {
    const { tasks } = this.props;
    return (
      <div>
        <h1>Задачи</h1>
        <TaskList tasks={tasks} />
        <input type="submit" value="Добавить Задачу" className="btn btn-primary" onClick={this.redirectToAddCoursePage} />
      </div>
    );
  }
}

TasksPage.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired })).isRequired,
  actions: PropTypes.shape({}).isRequired,
};

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(taskActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
