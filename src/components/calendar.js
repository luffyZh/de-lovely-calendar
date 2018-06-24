import React, { Component } from 'react';
import moment from 'moment';
import CalendarHeader from './calendar-header';
import CalendarBody from './calendar-body';
import './index.css';

class Calendar extends Component {
  constructor(props) {
    super(props);
    const dateStr = moment().format('YYYY-MM-DD');
    const dateArr = dateStr.split('-');
    this.state = {
      year: dateArr[0],
      month: dateArr[1],
      day: dateArr[2],
      clickType: this.props.clickType,
      absentDays: this.props.absentDays
    };
  }

  componentWillReceiveProps(nextProps) {
    const { clickType, absentDays } = nextProps;
    this.setState({ clickType, absentDays });
  }

  changeHeaderDate = (year, month) => {
    this.setState({
      year,
      month
    })
  }

  render() {
    const { year, month, day, clickType, absentDays } = this.state;
    return (
      <div className='calendar-container'>
        <CalendarHeader changeHeaderDate={this.changeHeaderDate} year={year} month={month} day={day} />
        <CalendarBody addAbsentDays={this.props.addAbsentDays} absentDays={absentDays} clickType={clickType} year={year} month={month} day={day} />
      </div>
    )
  }
}
export default Calendar;