import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
	active = false;

	@Input() event = {startDate: new Date(), endDate: new Date(), title: 'Training', owner: 'Max Erhart', info: 'Herren Training', weekly: false};
  eventPosition: {top: number, height: number};
  gridRowHeight = 20;
  height = 60;
  activeHeight = 250;
  constructor() { }

  ngOnInit(): void {

  }

  timeDifferenceToHeight(startTime, endTime){
    let height = 0;

    return height;
  }

  open(){
  	this.active = true;
  }
  close(){
  	this.active = false;
  }

}
