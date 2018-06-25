import React, { Component } from 'react';
import { DE_LOVELY_BIRTHDAY } from '../constant/constant';
import './index.css';

const rowArr = [1, 2, 3, 4, 5, 6];
const weekStr = ['日', '一', '二', '三', '四', '五', '六'];
const weekDay = {
  '日': '日曜日',
  '一': '月曜日',
  '二': '火曜日',
  '三': '水曜日',
  '四': '木曜日',
  '五': '金曜日',
  '六': '土曜日'
};


class DayRow extends Component {
  constructor(props) {
    super(props);
    const { year, month, firstDay, monthDays, clickType, absentDays } = props;
    this.state = {
      year,
      month,
      firstDay,
      monthDays,
      clickType,
      absentDays,
      existDateArr: []
    };
  }

  componentWillReceiveProps(nextProps) {
    const {year, month, firstDay, monthDays, clickType, absentDays} = nextProps;
    const existDateArr = [];
    absentDays.forEach(element => {
      existDateArr.push(element.date);
    })
    this.setState({ year, month, firstDay, monthDays, clickType, absentDays, existDateArr });
  }
  
  wholeDay = (e) => {
    e.persist();
    const { clickType } = this.state;
    const dateStr = e.target.id;
    const dateArr = dateStr.split('-');
    const date = dateArr[0] + '-' + dateArr[1] + '-' + (+dateArr[2] < 10 ? '0'+dateArr[2] : dateArr[2]);
    if (date.indexOf(DE_LOVELY_BIRTHDAY) > -1) {
      alert('Happy BirthDay! My De-Lovely Girl~');
    }
    const week = weekDay[dateArr[3]];
    const calendar_date = window.localStorage.getItem('lovely_calendar_date');
    const cellDom = document.getElementById(e.target.id);
    if (!calendar_date) {
      const absentDays = [];
      const dayObj = {
        date,
        week,
        clickType
      };
      absentDays.push(dayObj);
      window.localStorage.setItem('lovely_calendar_date', JSON.stringify(absentDays));
      cellDom.style.backgroundColor = clickType === 'whole' ? 'red' : 'orange';
      cellDom.style.color = '#fff';
      this.props.addAbsentDays();
    } else {
      if (cellDom.style.backgroundColor === 'red' || cellDom.style.backgroundColor === 'orange') {
        // 已选择过，取消
        cellDom.style.backgroundColor = '#ddd';
        cellDom.style.color = '#000';
        const storageDate = window.localStorage.getItem('lovely_calendar_date');
        const absentDays = JSON.parse(storageDate);
        const newArr = absentDays.filter((element) => {
          return element.date !== date;
        });
        if (newArr.length === 0) {
          window.localStorage.removeItem('lovely_calendar_date');
        } else {
          window.localStorage.setItem('lovely_calendar_date', JSON.stringify(newArr));
        }
        this.props.addAbsentDays();
      } else {
        // 没有选择过，存入
        const storageDate = window.localStorage.getItem('lovely_calendar_date');
        const absentDays = JSON.parse(storageDate);
        const dayObj = {
          date,
          week,
          clickType
        };
        absentDays.push(dayObj);
        window.localStorage.setItem('lovely_calendar_date', JSON.stringify(absentDays));
        cellDom.style.backgroundColor = clickType === 'whole' ? 'red' : 'orange';
        cellDom.style.color = '#fff';
        this.props.addAbsentDays();
      }
    }
  }

  render() {
    const { year, month, firstDay, monthDays, absentDays, existDateArr } = this.state;
    const lastDay = firstDay + monthDays;
    return (
      <div>
        {
          rowArr.map((item, index) => (
            <div key={`day-row-${index}`} className='body-container'>
            {
              [1, 2, 3, 4, 5, 6, 7].map((item, count) => {
                const dayId = 7 * (index) + item;
                let dom;
                for (let i = 1; i <= 42; i++) {
                  if (dayId >= firstDay + 1 && dayId <= lastDay) {
                    const today = `${year}-${month}-${(dayId-firstDay) < 10 ? '0' +(dayId - firstDay) : (dayId - firstDay)}`;
                    if (existDateArr.indexOf(today) > -1) {
                      const { clickType } = absentDays[existDateArr.indexOf(today)];
                      dom = <div onClick={this.wholeDay} key={`day-cell-${dayId}`} id={`${year}-${month}-${dayId-firstDay}-${weekStr[count]}`} className='day-cell' style={{ backgroundColor: clickType === 'whole' ? 'red' : 'orange' }}>{dayId - firstDay}</div>
                    } else {
                      dom = <div onClick={this.wholeDay} key={`day-cell-${dayId}`} id={`${year}-${month}-${dayId-firstDay}-${weekStr[count]}`} className='day-cell'>{dayId - firstDay}</div>
                    }
                  } else {
                    dom = <div key={`day-cell-${dayId}`} id={'day' + dayId} className='day-cell' style={{ color: '#ddd' }}>{dayId}</div> 
                  }
                }
                return dom;
              })
            }
            </div>
          ))
        }
      </div>
    )
  }
}
export default DayRow;