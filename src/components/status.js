import React, { Component } from 'react';
import Button from './button';
import { ipcRenderer } from 'electron';
import EventDetails from './event_details';


export default class Status extends Component {

  constructor(props) {
    super(props);
    this.handleShowSchedule = this.handleShowSchedule.bind(this);
    this.state = {
      status: 'free',
      displayedEvent: {},
    }
  }

  handleFifteen() {
    console.log('15min Button clicked');
  }

  handleThirty() {
    console.log('30min Button clicked');
  }

  componentDidMount() {
    ipcRenderer.send('calendar:list-events');

    ipcRenderer.on('calendar:list-events-success', (event, arg) => {
      this.setState({ displayedEvent: arg[1] });
    })

    ipcRenderer.on('calendar:list-events-error', (event, err) => {
      console.log(err, "Web")
    })
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners();
  }

  handleShowSchedule() {
    window.location.hash = 'schedule';
  }

  render() {
    return (
      <div className='status-view'>
        <div className='status-details'>
          <h3>Quick Booking</h3>
          <div className="action-buttons">
            <Button icon="15-min" handleClick={this.handleFifteen.bind(this)}/>
            <Button icon="30-min" handleClick={this.handleThirty.bind(this)}/>
          </div>
          <h1>It&lsquo;s {this.state.status}</h1>
        </div>
        <Button icon="arrow-up" handleClick={this.handleFifteen.bind(this)}/>
        <EventDetails displayedEvent={this.state.displayedEvent} handleShowSchedule={this.handleShowSchedule}/>
      </div>
    );
  }
}