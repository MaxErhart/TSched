import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {SettingService } from '../setting.service'

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

	activeDate: Date;
	@Output() pageEvent = new EventEmitter();
  constructor(private _settingService: SettingService) { }

  ngOnInit(): void {
    const settings = this._settingService.getSettings();
    this.activeDate = settings.initialDate;
  }

  pageChange(change){
  	var newDate = new Date();
  	newDate.setDate(this.activeDate.getDate() + change)
  	this.activeDate = newDate;
  	this.pageEvent.emit(this.activeDate);
  }

}
