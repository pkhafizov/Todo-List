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
    const { task: intask } = this.state;
    const field = event.target.name;
    const task = Object.assign({}, intask);
    task[field] = field === 'priorityId' ? parseInt(event.target.value, 10) : event.target.value;
    return this.setState({ task });
  }

  saveTask(event) {
    event.preventDefault();
    const { task } = this.state;
    const { actions } = this.props;
    const { router } = this.context;
    actions.saveTask(task);
    router.history.push('/tasks');
  }

  render() {
    const { priorities } = this.props;
    const { task } = this.state;
    const { errors } = this.state;
    return (
      <TaskForm
        allPriorities={priorities}
        onChange={this.updateTaskState}
        onSave={this.saveTask}
        task={task}
        errors={errors}
      />
    );
  }
}

ManageTaskPage.propTypes = {
  task: PropTypes.shape(
    { id: PropTypes.number.isRequired, priorityId: PropTypes.number },
  ).isRequired,
  priorities: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.number })).isRequired,
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
  const taskId = parseInt(ownProps.match.params.id, 10);

  let task = {
    id: 0,
    name: '',
    description: '',
    priorityId: 0,
  };

  if (taskId && state.tasks.length > 0) {
    task = getTaskById(state.tasks, taskId);
  }
  const prioritiesFormattedForDropdown = state.priorities.map(priority => (
    {
      priority: {
        value: priority.id,
        text: priority.name,
      },
    }
  ));

  return {
    task,
    priorities: prioritiesFormattedForDropdown,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(taskActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTaskPage);
