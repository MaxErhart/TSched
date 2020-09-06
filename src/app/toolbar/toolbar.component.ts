import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  activePage: {id: number, name: string};
	courtPages = [{id: 0, name: 'Platz 1'}, {id: 1, name: 'Platz 2'}, {id: 2, name: 'Platz 3'}];
	@Output() pageCourtChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  	this.activePage = this.courtPages[0];
  }

  changePage(page){
  	this.activePage = page;
  	this.pageCourtChange.emit(page);
  }

}
