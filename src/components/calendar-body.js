import React, { Component } from 'react';
import moment from 'moment';
import DayRow from './day-row';
import './index.css';

const DAYSTRING = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

class CalendarBody extends Component {
  constructor(props) {
    super(props);
    const { year, month, day, clickType, absentDays } = props;
    const firstDay = moment(`${year}-${month}`, "YYYY-MM").day();
    const monthDays = moment(`${year}-${month}`, "YYYY-MM").daysInMonth()
    this.state = {
      year,
      month,
      day,
      monthDays,
      firstDay,
      clickType,
      absentDays
    };
  }

  componentWillReceiveProps(nextProps) {
    const { year, month, clickType, absentDays } = nextProps;
    const firstDay = moment(`${year}-${month}`, "YYYY-MM").day();
    const monthDays = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
    this.setState({ year, month, monthDays, firstDay, clickType, absentDays });
  }

  render() {
    const DayTitle = () => {
      return (
        <div>
          <div className='body-container'>
            {
              DAYSTRING.map((item, index) => (
                <div key={index} className='day-title-cell'>{item}</div>
              ))
            }
          </div>
        </div>
      )
    }
    const { year, month, firstDay, monthDays, clickType, absentDays } = this.state;
    return (
      <div>
        <DayTitle />
        <DayRow addAbsentDays={this.props.addAbsentDays} absentDays={absentDays} clickType={clickType} year={year} month={month} firstDay={firstDay} monthDays={monthDays} />
      </div>
    )
  }
}
export default CalendarBody;