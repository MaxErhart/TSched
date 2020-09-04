import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

	timeline = [];
	gridSettings = {rows: 48, cols: 1};
  timelineSettings = {startTime: 8, endTime: 20, timeIncrementPerRow: 0.25};
  constructor() { }

  ngOnInit(): void {
  	this.generateTimeline();
  }

  generateTimeline(){
  	const startTime = new Date(2020, 0, 1, this.timelineSettings.startTime, 0);
  	const endTime = new Date(2020, 0, 1, this.timelineSettings.endTime, 0);
  	let i = 0;
  	while(true){
  		const temp = new Date(2020, 0, 1, this.timelineSettings.startTime, 60*2*this.timelineSettings.timeIncrementPerRow*i);
  		i++;
  		if(temp.getTime()> endTime.getTime()){
  			break;
  		}
  		this.timeline.push(temp);

  	}
  }
}
