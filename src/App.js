import React, { Component } from 'react';
import Calendar from './components/calendar';
import './App.css';
import smile from './img/smile.png';
import normal from './img/normal.png';
import error from './img/error.png';
import workDayVal from './core/countDays';


class App extends Component {
  constructor(props){
    super(props);
    this.state = { clickType: 'whole', absentDays: [], problemDays: 0 }
  }

  componentDidMount() {
    const storageDate = window.localStorage.getItem('lovely_calendar_date');
    const absentDays = JSON.parse(storageDate);
    if (absentDays) {
      let tempDays = 0;
      absentDays.forEach(item => {
        if (item.clickType === 'whole') {
          tempDays = tempDays + 1;
        } else {
          tempDays = tempDays + 0.5;
        }
      });
      this.setState({ absentDays, problemDays: tempDays });
    }
  }


  addAbsentDays = () => {
    const storageDate = window.localStorage.getItem('lovely_calendar_date');
    const absentDays = JSON.parse(storageDate);
    if (absentDays) {
      let tempDays = 0;
      absentDays.forEach(item => {
        if (item.clickType === 'whole') {
          tempDays = tempDays + 1;
        } else {
          tempDays = tempDays + 0.5;
        }
      });
      this.setState({ absentDays, problemDays: tempDays });
    } else {
      this.setState({ absentDays: [], problemDays: 0 });
    }
  }

  likeYou = () => {
    const luffy_like_de_lovely = window.localStorage.getItem('luffy_like_de_lovely');
    if (!luffy_like_de_lovely) {
      window.localStorage.setItem('luffy_like_de_lovely', '1');
    } else {
      const newVal = Number(luffy_like_de_lovely) + 1;
      if (newVal === 26) {
        alert('I like you, and you?');
        window.localStorage.removeItem('luffy_like_de_lovely');
      } else {
        window.localStorage.setItem('luffy_like_de_lovely', newVal.toString());
      }
    }
  }

  render() {
    const { clickType, absentDays, problemDays } = this.state;
    const rateNum = 100 - (problemDays/workDayVal).toFixed(4) * 100;
    return (
      <div className="App">
        <div className="App-left">
          <div className='App-intro'>
            <div className='intro-title'>出席統計 - 使用方法</div>
            <div className='intro-content'>
              2018.04.17 ~ 2018.09.14, 月曜日から金曜日は計算日です, <br/>
              月曜日、水曜日、金曜日: 1日に7レッスン,<br />
              火曜日、木曜日: 1日に9レッスン,<br />
              出席率は85％以上に達する必要があります!
            </div>
            <div className='intro-hint'>     
              <div className='normal-hint'>通常の出席</div>
              <div className='half-hint'>半日休み</div>
              <div className='whole-hint'>終日休み</div>
            </div>
          </div>
          <Calendar addAbsentDays={this.addAbsentDays} clickType={clickType} absentDays={absentDays} />
          <div className='App-choose'>
            欠席タイプを選択する:
            <div 
              onClick={() => this.setState({ clickType: 'whole' }) }
              className='choose-btn'
              style={{ backgroundColor: clickType === 'whole' ? 'red' : '' }}
              >終日休</div>
            <div
              onClick={() => this.setState({ clickType: 'half' })}
              className='choose-btn'
              style={{ backgroundColor: clickType === 'half' ? 'orange' : '' }}
            >半日休</div>
          </div>
        </div>
        <div className="App-right">
          <img 
            alt='logo'
            src={rateNum >= 95.0 ? smile : (rateNum >= 88 ? normal : error ) }
            className='logo'
            onClick={this.likeYou}
          />
          <div className='result-container'>
            <div className='result-text'>
              出席率:
              <span style={{ color: rateNum >= 95.0 ? 'green' : (rateNum >= 88.0 ? 'orange' : 'red'), fontSize: '1.4rem', fontWeight: '600' }}>
                { rateNum + '%'}
              </span>
            </div>
            <div className='result-text'>
              不在の日数：
              <span style={{ color: 'red' }}>{problemDays}</span>
            </div>
            <div className='result-table-container'>
              {
                absentDays.map((item, index) => (
                  <div className='result-table' key={`$(item.date)}${index}`}>
                    <div className='table-item'>{item.date}</div>
                    <div className='table-item'>{item.week}</div>
                    <div className='table-item'>{item.clickType === 'whole' ? '1' : '0.5'}</div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
