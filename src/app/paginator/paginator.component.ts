import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

	activeDate: Date;
	@Output() pageEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
		this.activeDate = new Date();
		console.log('init');
  }

  pageChange(change){
  	var newDate = new Date();
  	newDate.setDate(this.activeDate.getDate() + change)
  	this.activeDate = newDate;
  	this.pageEvent.emit(this.activeDate);
  }

}
