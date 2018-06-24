import React, { Component } from 'react';
import './index.css';
import leftMonth from './left.png';
import rightMonth from './right.png';

const MONTH = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

class CalendarHeader extends Component {
  constructor(props) {
    super(props);
    const { year, month, day } = props;
    this.state = {
      year,
      month,
      day
    };
  }

  preMonth = () => {
    const tempIndex = MONTH.indexOf(this.state.month);
    if ( tempIndex !== 0 ) {
      this.setState({ month: MONTH[tempIndex - 1] }, () => {
        this.props.changeHeaderDate(this.state.year, MONTH[tempIndex - 1]);
      });
    } else {
      this.setState({ year: Number(this.state.year) - 1, month: MONTH[11] }, () => {
        this.props.changeHeaderDate(this.state.year, this.state.month);
      });
    }
  }

  nextMonth = () => {
    const tempIndex = MONTH.indexOf(this.state.month);
    if ( tempIndex !== 11 ) {
      this.setState({ month: MONTH[tempIndex + 1] }, () => {
        this.props.changeHeaderDate(this.state.year, MONTH[tempIndex + 1]);
      });
    } else {
      this.setState({ year: Number(this.state.year) + 1, month: '01' }, () => {
        this.props.changeHeaderDate(this.state.year.toString(), this.state.month);
      });
    }
  }

  render() {
    const { year, month } = this.state;
    return (
      <div className='header-container'>
        <img onClick={this.preMonth} className='header-icon' alt='left-month' src={leftMonth} />
        <div> {year} 年 {month} 月 </div>
        <img onClick={this.nextMonth} className='header-icon' alt='right-month' src={rightMonth} />
      </div>
    )
  }
}
export default CalendarHeader;