import { Injectable } from '@angular/core';
import {BookedEvent} from './bookedEvent.interface'
import { HttpClient, HttpClientXsrfModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded',
    Authorization: 'my-auth-token',
    responseType: 'blob'
  })
};


@Injectable({
  providedIn: 'root'
})
export class EventService {


	events = [

	];

  constructor(private http: HttpClient, private httpXSRF: HttpClientXsrfModule) { }

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
  	// if(!this.eventCollision(event)){
	  //   try {
	  //     this.events.push({id: this.events[this.events.length-1].id +1, startDate: event.startDate, endDate: event.endDate, pageId: event.pageId.id, user: event.user, category: event.category, info: event.info, weekly: event.weekly, numOfWeeks: event.numOfWeeks});
	  //   } catch (e) {
	  //     this.events.push({id: 0, startDate: event.startDate, endDate: event.endDate, pageId: event.pageId.id, user: event.user, category: event.category, info: event.info, weekly: event.weekly, numOfWeeks: event.numOfWeeks});
	  //   }
  	// }
    const formData = new FormData();
    formData.append('event', event)
    // console.log(formData)
    return this.http.post<any>('./', formData, httpOptions);

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
