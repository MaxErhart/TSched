import { Component, OnInit, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { invalidTimeSpanValidator, pastDateValidator } from '../book-form.validators'
import * as Moment from 'moment';
import {BookedEvent} from '../bookedEvent.interface'
import { EventService } from '../event.service';


@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

	primary600 = '#5600e818';
	colors = {Grau: 'gray', Lila: '#6300ee', Grün: '#03dac4', Blau: '#3f51b5', Rot: '#F9665E', Pink: '#E18AAA'};

	page2Ative = false;
	active = false;
	errorMessages = {startTimeLarger: 'Zeitspanne ungültig', pastDate: 'Datum veraltet', required: 'Benötigtes Feld', pattern: 'Uhrzeit ungültig'}
	@Input() selection: {date: Date, startTime: string, endTime: string};
  @Input() activePageCourt: {id: number, name: string};
  @Input() user;
  @Output() submit = new EventEmitter();
	bookForm = new FormGroup(
		{
			date: new FormControl('', [Validators.required, pastDateValidator]),
			startTime: new FormControl('', [Validators.required]),
			endTime: new FormControl('', [Validators.required]),
			weekly: new FormControl(''),
			title: new FormControl('', [Validators.required]),
			color: new FormControl(''),
			info: new FormControl(''),
		},
		{ validators: invalidTimeSpanValidator },
	);

  constructor(private _eventService: EventService) { }

  ngOnInit(): void {
  }


  @HostListener('document:keypress', ['$event']) documentClick(event: KeyboardEvent) {
    if(event.charCode == 13){
      this.close(true, {target: {id: 'submit'}})
    }
  }
  // @HostListener('document:click', ['$event']) documentClick(event: MouseEvent) {
  // }

  openPage2(){

  	if(this.bookForm.get('date').errors == null && this.bookForm.get('startTime').errors == null && this.bookForm.get('endTime').errors == null){
  		this.page2Ative=true;
  	} else {
	    this.bookForm.get('date').markAsTouched();
	    this.bookForm.get('startTime').markAsTouched();
	    this.bookForm.get('endTime').markAsTouched();
  	}
  }

  closePage2(){
  	this.page2Ative=false;

  }

  open(){
  	if(this.selection){
	    this.bookForm.get('date').setValue(Moment(this.selection.date));
	    this.bookForm.get('startTime').setValue(this.selection.startTime);
	    this.bookForm.get('endTime').setValue(this.selection.endTime);
  	}
  	this.active=true;
  }

  close(submit, event?){
  	if(submit && this.user){
	  	if(this.bookForm.valid){
        const eventIDless = this.generateIDlessEvent({formGroup: this.bookForm, activePageCourtId: this.activePageCourt.id})
        this._eventService.addEvent(eventIDless)
        this.submit.emit(event);
		  	this.active = false;
        this.page2Ative = false;
        this.clearFields();
	  	} else {
        this.bookForm.get('title').markAsTouched();
      }
  	} else {
  		this.active = false;
      this.page2Ative = false;
      this.clearFields();
  	}
  }

  clearFields(){
    this.bookForm.get('date').setValue('');
    this.bookForm.get('startTime').setValue('');
    this.bookForm.get('endTime').setValue('');
    this.bookForm.get('title').setValue('');
    this.bookForm.get('color').setValue('');
    this.bookForm.get('info').setValue('');
    this.bookForm.get('date').markAsUntouched();
    this.bookForm.get('startTime').markAsUntouched();
    this.bookForm.get('endTime').markAsUntouched();
    this.bookForm.get('title').markAsUntouched();
    this.bookForm.get('color').markAsUntouched();
    this.bookForm.get('info').markAsUntouched();
  }

  getErrorMessage(control){
  	if(control.errors){
	  	return this.errorMessages[Object.keys(control.errors)[0]];
  	}
  }

  generateIDlessEvent(data){
    const date = data.formGroup.get('date').value._d;
    const start = data.formGroup.get('startTime').value.split(':');
    const end = data.formGroup.get('endTime').value.split(':');
    let startDate = new Date(date);
    startDate.setHours(+start[0]);
    startDate.setMinutes(+start[1]);
    startDate.setSeconds(0);
    let endDate = new Date(date);
    endDate.setHours(+end[0]);
    endDate.setMinutes(+end[1]);
    endDate.setSeconds(0);
    let color = '#3f51b5';
    if(data.formGroup.get('color').value){
      color =  data.formGroup.get('color').value;
    }
    return {startDate: startDate, endDate: endDate, title: data.formGroup.get('title').value, owner: 'Max Erhart', info: data.formGroup.get('info').value ? data.formGroup.get('info').value : 'Keine Beschreibung', weekly: data.formGroup.get('weekly').value, pageId: data.activePageCourtId, backgroundColor: color};
  }

}
