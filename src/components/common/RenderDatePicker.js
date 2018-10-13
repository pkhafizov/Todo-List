import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';


import '../../../node_modules/react-datepicker/dist/react-datepicker.css';

class RenderDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    const { name } = this.props;
    const event = {
      target: {
        name,
        value: moment(date).format('YYYY-MM-DD[T]HH:mm:ss'),
      },
    };
    const { onChange } = this.props;
    onChange(event);
  }

  handleChangeRow(event) {
    const { onChangeRow } = this.props;
    onChangeRow(event);
  }

  render() {
    const { startDate } = this.props;
    const { name } = this.props;
    const { label } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>
          {label}
        </label>
        <div className="input-group">
          <DatePicker
            className="form-control"
            selected={startDate ? moment(startDate) : null}
            onChange={this.handleChange}
            onChangeRaw={event => this.handleChangeRow(event)}
            locale="ru"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="DD.MM.YYYY HH:mm"
            timeCaption="Время"
            placeholderText="Выбрать дату и время"
          />
        </div>
      </div>
    );
  }
}

RenderDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  startDate: PropTypes.string,
  onChangeRow: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

RenderDatePicker.defaultProps = {
  startDate: null,
};

export default RenderDatePicker;
