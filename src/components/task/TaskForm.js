import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import DatePicker from '../common/DatePicker';

const TaskForm = ({
  task, allPriorities, onSave, onChange, loading, errors,
}) => (
  <form>
    <h1>Редактирование задачи</h1>
    <TextInput
      name="name"
      label="Название"
      value={task.name}
      onChange={onChange}
      error={errors.title}
    />
    <TextInput
      name="description"
      label="Описание"
      value={task.description}
      onChange={onChange}
      error={errors.description}
    />
    <SelectInput
      name="priorityId"
      label="Важность"
      value={task.priorityId}
      defaultOption="Выбрать важность задачи"
      options={allPriorities}
      onChange={onChange}
      error={errors.priorityId}
    />
    <DatePicker
      name="sheduledDate"
    />
    <DatePicker
      name="finishDate"
    />
    <input
      type="submit"
      disabled={loading}
      value={loading ? 'Сохранение...' : 'Сохранить'}
      className="btn btn-primary"
      onClick={onSave}
    />
  </form>
);

TaskForm.propTypes = {
  task: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  allPriorities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.shape({}).isRequired,
};

TaskForm.defaultProps = {
  loading: false,
};

export default TaskForm;
