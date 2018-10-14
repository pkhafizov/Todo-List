import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import RenderDatePicker from '../common/RenderDatePicker';

const TaskForm = ({
  task, allPriorities, onSave, onChange, loading, errors,
}) => (
  <form>
    {task.id !== 0 && (<h1>Редактирование задачи</h1>)}
    {task.id === 0 && (<h1>Создание задачи</h1>)}
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
    <div className="col-md-4 pl-0">
      <SelectInput
        name="priorityId"
        label="Приоритет"
        value={task.priorityId}
        defaultOption=""
        options={allPriorities}
        onChange={onChange}
        error={errors.priorityId}
      />
    </div>
    <RenderDatePicker
      name="sheduledDate"
      label="Запланированная дата"
      startDate={task.sheduledDate}
      onChange={onChange}
      onChangeRow={onChange}
    />
    {task.id !== 0 && (<RenderDatePicker
      name="finishDate"
      label="Дата выполнения"
      startDate={task.finishDate}
      onChange={onChange}
      onChangeRow={onChange}
    />
    )}
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
  task: PropTypes.shape(
    { id: PropTypes.number.isRequired, priorityId: PropTypes.number },
  ).isRequired,
  allPriorities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.shape({ title: '' }).isRequired,
};

TaskForm.defaultProps = {
  loading: false,
};

export default TaskForm;
