import { Component, OnInit, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { invalidTimeSpanValidator, pastDateValidator } from '../book-form.validators'
import * as Moment from 'moment';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

	primary600 = '#5600e818';
	colors = {Grau: 'gray', Lila: '#6300ee', Grün: '#03dac4', Blau: '#58949C', Rot: '#F9665E', Pink: '#E18AAA'};
	page2Ative = false;
	active = false;
	errorMessages = {startTimeLarger: 'Zeitspanne ungültig', pastDate: 'Datum veraltet', required: 'Benötigtes Feld'}
	@Input() selection: {date: Date, startTime: string, endTime: string};
  @Output() submit = new EventEmitter();
	bookForm = new FormGroup(
		{
			date: new FormControl('', [Validators.required, pastDateValidator]),
			startTime: new FormControl('', [Validators.required, Validators.pattern('([01]?[0-9]|20):(00|15|30|45)')]),
			endTime: new FormControl('', [Validators.required, Validators.pattern('([01]?[0-9]|20):(00|15|30|45)')]),
			weekly: new FormControl(''),
			title: new FormControl('', [Validators.required]),
			color: new FormControl(''),
			info: new FormControl(''),
		},
		{ validators: invalidTimeSpanValidator },
	);

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('document:click', ['$event']) documentClick(event: MouseEvent) {
  	// console.log(this.bookForm.value)
  	// console.log(Object.keys(this.bookForm.get('date').errors))
  }

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

  close(submit){
  	if(submit){
	  	if(this.bookForm.valid){
	  		console.log('pls implemet submit lol')
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

}
