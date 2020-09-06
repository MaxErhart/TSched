import { Injectable } from '@angular/core';
import {BookedEvent} from './bookedEvent.interface'

@Injectable({
  providedIn: 'root'
})
export class EventService {


	events = [
		{id: 0, startDate: new Date(2020, 8, 5, 8, 30), endDate: new Date(2020, 8, 4, 11, 0), title: 'Training', owner: 'Max Erhart', info: 'Herren Training', weekly: false, pageId: 0, backgroundColor: '#5600e8'},
		{id: 1, startDate: new Date(2020, 8, 5, 11, 30), endDate: new Date(2020, 8, 4, 12, 0), title: 'Training', owner: 'Max Erhart', info: 'Herren Training', weekly: false, pageId: 0, backgroundColor: '#5600e8'},
		{id: 2, startDate: new Date(2020, 8, 5, 14, 45), endDate: new Date(2020, 8, 4, 16, 15), title: 'Training', owner: 'Max Erhart', info: 'Herren Training', weekly: false, pageId: 1, backgroundColor: '#5600e8'},
		{id: 3, startDate: new Date(2020, 8, 5, 15, 0), endDate: new Date(2020, 8, 4, 16, 30), title: 'Training', owner: 'Max Erhart', info: 'Herren Training', weekly: false, pageId: 2, backgroundColor: '#5600e8'},
	];

  constructor() { }

  getEvents(date, pageId){
  	var ret = [];
  	for(let event of this.events){
  		if(event.startDate.getFullYear() == date.getFullYear() && event.startDate.getMonth() == date.getMonth() && event.startDate.getDate() == date.getDate() && event.pageId == pageId){
  			ret.push(event)
  		}
  	}
  	return ret;
  }

  addEvent(event){
  	if(!this.eventCollision(event)){
	    try {
	      this.events.push({id: this.events[this.events.length-1].id +1, startDate: event.startDate, endDate: event.endDate, pageId: event.pageId, owner: event.owner, title: event.title, info: event.info, backgroundColor: event.backgroundColor, weekly: event.weekly});
	    } catch (e) {
	      this.events.push({id: 0, startDate: event.startDate, endDate: event.endDate, pageId: event.pageId, owner: event.owner, title: event.title, info: event.info, backgroundColor: event.backgroundColor, weekly: event.weekly});
	    }
  	}
  }

  deleteEvent(event){
    for(let index=0; index<this.events.length; index++){
      if(this.events[index].id==event.id){
        this.events.splice(index, 1);
      }
    }
  }

eventCollision(event){
	return false;
}

}
