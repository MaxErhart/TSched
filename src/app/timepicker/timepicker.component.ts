import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent implements OnInit {

  valid = false;
	houreList = ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
	minuteList = ["00", "15", "30", "45"];
	@Input() selectedHoure: string;
	@Input() selectedMinute: string;
	@Output() submit = new EventEmitter();
	active = false;
	@ViewChild('houres') hourPickerElement: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  	this.hourPickerElement.nativeElement.scrollTop = 13.5*this.hourPickerElement.nativeElement.offsetHeight/5;
  }

  onScroll(event){
		if(event.target.scrollTop <=100){
			this.hourPickerElement.nativeElement.scrollTop = event.target.scrollTop+12*this.hourPickerElement.nativeElement.offsetHeight/5;
		} else if(event.target.scrollTop >= event.target.scrollHeight-this.hourPickerElement.nativeElement.offsetHeight-100){
			this.hourPickerElement.nativeElement.scrollTop = event.target.scrollTop - 12*this.hourPickerElement.nativeElement.offsetHeight/5;
		}
  }

  selectHoure(houre){
    event.stopPropagation();
    this.selectedHoure = houre;
    this.updateValidity();
  }

  selectMinute(minute){
    event.stopPropagation();
    this.selectedMinute = minute;
    this.updateValidity();
  }

  updateValidity(){
    if(this.selectedHoure && this.selectedMinute){
      this.valid = true;
    }
  }

  close(submit){
    event.stopPropagation();
  	this.active = false;
  	if(submit && this.selectedHoure && this.selectedMinute){
      if(this.selectedHoure == '20'){
        this.submit.emit({houre: this.selectedHoure, minute: '00'})
      } else{
        this.submit.emit({houre: this.selectedHoure, minute: this.selectedMinute})
      }

  	}
  }

  open(){
    event.stopPropagation();
  	this.active = true;
  }

  toggle(){
    event.stopPropagation();
    this.active ? this.close(false) : this.open();
  }

}
