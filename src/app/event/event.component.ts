import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
	active = true;
	event = {startDate: new Date(), endDate: new Date(), title: 'Training', owner: 'Max Erhart', info: 'Herren Training'}
  constructor() { }

  ngOnInit(): void {
  }

  open(){
  	this.active = true;
  }
  close(){
  	this.active = false;
  }

}
