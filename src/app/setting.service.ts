import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

	gridSetting = {rows: 48, cols: 1};
	initialDate = new Date();

  constructor() { }
  getSettings(){
  	return {gridSettings: this.gridSetting, initialDate: this.initialDate};
  }
}
