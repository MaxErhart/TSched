import { Component, OnInit, HostListener } from '@angular/core';
import {FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, FormGroupDirective, NgForm, AbstractControl} from '@angular/forms';
import * as Moment from 'moment';

export const invalidTimeSpanValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
	const startTime = control.get('startTime');
	const endTime = control.get('endTime');
	if(startTime.value && endTime.value){
		if(+startTime.value.split(':')[0] > +endTime.value.split(':')[0] || (+startTime.value.split(':')[0] == +endTime.value.split(':')[0] && +startTime.value.split(':')[1] >= +endTime.value.split(':')[1])){
			control.get('startTime').setErrors({startTimeLarger: true});
			control.get('endTime').setErrors({startTimeLarger: true});
			return {startTimeLarger: true};

		} else {
			control.get('startTime').setErrors(null);
			control.get('endTime').setErrors(null);
			return null;
		}
	}
};


export const pastDateValidator: ValidatorFn = (control: FormControl): ValidationErrors | null => {
	const today = new Date();
	if(control.value && control.value._d.getFullYear()>=today.getFullYear() && control.value._d.getMonth()>=today.getMonth() && control.value._d.getDate()>=today.getDate()){
		return null;
	} else {
		return {pastDate: true};
	}
}

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

	primary600 = '#5600e818';
	colors = {Grau: 'gray', Lila: '#6300ee', Grün: '#03dac4', Blau: '#58949C', Rot: '#F9665E', Pink: '#E18AAA'};
	page2Ative = false;
	active = true;
	errorMessages = {startTimeLarger: 'Zeitspanne ungültig', pastDate: 'Datum veraltet', required: 'Benötigtes Feld'}
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
  	// console.log(this.bookForm)
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

  close(submit){
  	if(submit){
	  	if(this.bookForm.valid){
		  	this.active = false;
	  	}
  	} else {
  		this.active = false;
  	}
  }

  getErrorMessage(control){
  	if(control.errors){
	  	return this.errorMessages[Object.keys(control.errors)[0]];
  	}

  }

}
