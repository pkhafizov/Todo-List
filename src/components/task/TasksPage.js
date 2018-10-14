import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskActions from '../../actions/taskActions';
import * as filterActions from '../../actions/filterActions';
import TaskList from './TaskList';
import history from '../../history';
import SelectInput from '../common/SelectInput';

class TasksPage extends React.Component {
  constructor(props) {
    super(props);

    this.history = history;

    this.redirectToAddTaskPage = this.redirectToAddTaskPage.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const { actions } = this.props;
    const priorityId = parseInt(event.target.value, 10);
    actions.tasksByP(priorityId);
    actions.loadTasksByPriority(priorityId);
  }

  redirectToAddTaskPage() {
    this.history.push('/task');
  }

  deleteTask(id) {
    const { actions } = this.props;
    actions.deleteTask(id);
  }

  render() {
    const { filter } = this.props;
    const { tasks } = this.props;
    const { priorities } = this.props;
    const { prioritiesFormatted } = this.props;
    return (
      <div>
        <h1>Задачи</h1>
        <div className="row">
          <form className="form-inline">
            <input
              type="submit"
              value="Добавить Задачу"
              className="btn btn-primary"
              onClick={this.redirectToAddTaskPage}
            />
            <SelectInput
              name="priorityId"
              label=""
              value={filter}
              options={prioritiesFormatted}
              onChange={this.onChange}
              error=""
            />
          </form>
        </div>
        <div className="row mt-1">
          <TaskList tasks={tasks} allPriorities={priorities} onDelete={this.deleteTask} />
        </div>
      </div>
    );
  }
}

TasksPage.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired })).isRequired,
  priorities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  prioritiesFormatted: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.number })).isRequired,
  filter: PropTypes.number.isRequired,
  actions: PropTypes.shape({}).isRequired,
};

function mapStateToProps(state) {
  const prioritiesFormattedForDropdown = state.priorities.map(priority => (
    {
      priority: {
        value: priority.id,
        text: priority.name,
      },
    }
  ));

  const allSelectPriority = {
    priority: {
      value: -1,
      text: 'Все',
    },
  };
  prioritiesFormattedForDropdown.push(allSelectPriority);

  return {
    tasks: state.tasks,
    priorities: state.priorities,
    filter: state.filter,
    prioritiesFormatted: prioritiesFormattedForDropdown,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, taskActions, filterActions), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
