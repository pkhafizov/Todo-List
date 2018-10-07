import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as taskActions from '../../actions/taskActions';
import TaskForm from './TaskForm';

class ManageTaskPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: Object.assign({}, props.task),
      errors: {},
    };

    this.updateTaskState = this.updateTaskState.bind(this);
    this.saveTask = this.saveTask.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.task.id !== state.task.id) {
      return {
        task: Object.assign({}, props.task),
      };
    }

    return null;
  }

  updateTaskState(event) {
    const field = event.target.name;
    let task = Object.assign({}, this.state.task);
    task[field] = event.target.value;
    return this.setState({ task: task });
  }

  saveTask(event) {
    event.preventDefault();
    this.props.actions.saveTask(this.state.task);
    this.context.router.history.push('/tasks');
  }

  render() {
    return (
      <TaskForm
        allPriorities={this.props.priorities}
        onChange={this.updateTaskState}
        onSave={this.saveTask}
        task={this.state.task}
        errors={this.state.errors}
      />
    );
  }
}

ManageTaskPage.propTypes = {
  task: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  priorities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  actions: PropTypes.shape({}).isRequired,
};

ManageTaskPage.contextTypes = {
  router: PropTypes.shape({}).isRequired,
};

function getTaskById(tasks, id) {
  const task = tasks.filter(t => t.id === id);
  if (task.length) return task[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const taskId = ownProps.match.params.id;

  let course = {
    id: '', watchHref: '', title: '', authorId: '', length: '', category: '',
  };

  if (taskId && state.tasks.length > 0) {
    course = getTaskById(state.tasks, taskId);
  }
  const prioritiesFormattedForDropdown = state.priorities.map(priority => {
      value: priority.id,
      text: priority.name
    });

  return {
    task: task,
    priorities: prioritiesFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(taskActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTaskPage);
