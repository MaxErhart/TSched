import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {BookedEvent} from '../bookedEvent.interface'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
	active = false;

  colors = {Training: '#3f51b5', Privat: '#00b798', Tunier: '#ff4080'};

	@Input() event: BookedEvent;
  @Output() deleteEvent = new EventEmitter();
  eventPosition: {top: number, height: number};
  gridRowHeight = 20;
  height: number;
  top: number;
  activeHeight = 250;
  constructor() { }

  ngOnInit(): void {
    this.height = this.timeDifferenceToHeight(this.event.startDate, this.event.endDate);
    this.top = this.startTimeToTop(this.event.startDate);
  }

  timeDifferenceToHeight(startTime, endTime){
    const tIncrement = 0.25;
    const rowHeight = 20
    const tStart = startTime.getHours() + startTime.getMinutes()/60;
    const tEnd = endTime.getHours() + endTime.getMinutes()/60;
    return ((tEnd - (tStart))/tIncrement)*rowHeight;
  }

  startTimeToTop(startTime){
    const t0 = 8;
    const tIncrement = 0.25;
    const rowHeight = 20
    const tStart = startTime.getHours() + startTime.getMinutes()/60;
    return (tStart - t0)/tIncrement*rowHeight;
  }

  open(){
  	this.active = true;
  }
  close(){
  	this.active = false;
  }

  toggle(){
    this.active ? this.active = false : this.active = true;
  }

  deleteMe(){
    this.deleteEvent.emit(this.event);
  }

}
