import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  activePage: {id: number, name: string};
	courtPages = [{id: 0, name: 'Platz 1'}, {id: 1, name: 'Platz 2'}, {id: 2, name: 'Platz 3'}];
  settingPagesActive = [{id: 0, name: 'Einstellungen'}, {id: 1, name: 'Verein wechseln'}, {id: 3, name: 'Ausloggen'}];
  settingPagesInactive = [{id: 1, name: 'Verein wechseln'}, {id: 2, name: 'Einloggen'}];

  @Input() user;
	@Output() pageCourtChange = new EventEmitter();
  @Output() logoutEmitter = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  	this.activePage = this.courtPages[0];
  }

  changePage(page){
  	this.activePage = page;
  	this.pageCourtChange.emit(page);
  }

  menuClick(page){
    if(page.id == 3){
      this.logout();
    }
  }

  logout(){
    delete this.user;
    this.logoutEmitter.emit();
  }

}
