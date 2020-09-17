import { Component, OnInit, HostListener, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { invalidTimeSpanValidator, pastDateValidator, bookedColissionValidatorFunction } from '../book-form.validators'
import * as Moment from 'moment';
import {BookedEvent} from '../bookedEvent.interface'
import { EventService } from '../event.service';
import { HttpClient } from '@angular/common/http';
import { FormAnimation, ExpandAnimation } from '../form.animation'

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  animations: [FormAnimation, ExpandAnimation],
})
export class BookFormComponent implements OnInit {

  checked=false;
  stage = 0;
  stages = ['step0', 'step1', 'step2', 'step3'];
  height: number;
  screenWindow = window;
	primary600 = '#5600e818';

	// colors = {Grau: 'gray', Lila: '#6300ee', Grün: '#03dac4', Blau: '#3f51b5', Rot: '#F9665E', Pink: '#E18AAA'};
  eventCategories = {Training: '#3f51b5', Privat: '#00b798', Tunier: '#ff4080'};


	page2Ative = false;
	active = false;
	errorMessages = {startTimeLarger: 'Zeitspanne ungültig', pastDate: 'Datum veraltet', required: 'Benötigtes Feld', pattern: 'Uhrzeit ungültig', colission: 'Bereits belegt'}
	@Input() selection: {date: Date, startTime: string, endTime: string};
  @Input() activePageCourt: {id: number, name: string};
  @Input() user;
  @Output() submit = new EventEmitter();
  @ViewChild('formBody') formBody: ElementRef;

	bookForm = new FormGroup(
		{
			date: new FormControl('', [Validators.required, pastDateValidator]),
			startTime: new FormControl('', [Validators.required]),
			endTime: new FormControl('', [Validators.required]),
			weekly: new FormControl(''),
			category: new FormControl('', [Validators.required]),
			info: new FormControl(''),
      activePageCourt: new FormControl(''),
      numOfWeeks: new FormControl(2),
      user: new FormControl(''),
		},
		{ validators: [invalidTimeSpanValidator, bookedColissionValidatorFunction(this._eventService)] },
	);

  constructor(private _eventService: EventService, private http: HttpClient) { }

  toggleCheckbox(event?){
    this.bookForm.controls.weekly.setValue(!this.bookForm.controls.weekly.value);
    this.checked ? this.checked = false : this.checked = true;
  }

  ngOnInit(): void {
  }

  onSubmit(customerData){

    this.bookForm.reset();
    this._eventService.addEvent(this.generateEventData(customerData));
    this.stage = 0;
    this.close()
  }

  generateEventData(customerData){
    var formData = new FormData();
    const year = customerData.date._d.getFullYear();
    const month = customerData.date._d.getMonth();
    const date = customerData.date._d.getDate();
    const startDate = new Date(year, month, date, customerData.startTime.split(':')[0], customerData.startTime.split(':')[1]);
    const endDate = new Date(year, month, date, customerData.endTime.split(':')[0], customerData.endTime.split(':')[1]);
    return {startDate: startDate, endDate: endDate, pageId: customerData.activePageCourt, weekly: customerData.weekly, category: customerData.category, info: customerData.info, numOfWeeks: customerData.numOfWeeks, user: customerData.user};
    formData.append('startDate',  startDate.toString());
    formData.append('endDate',  endDate.toString());
    formData.append('pageId',  customerData.activePageCourt);
    formData.append('weekly',  customerData.weekly);
    formData.append('category',  customerData.category);
    formData.append('info',  customerData.info);
    formData.append('numOfWeeks',  customerData.numOfWeeks);
    formData.append('user',  customerData.user);

    // return formData;
  }

  changeFormStep(change){
    if(change > 0 && this.stage < this.stages.length - 1){
      return this.stage + change;
    } else if (change < 0 && this.stage > 0){
      return this.stage + change;
    } else {
      return this.stage;
    }

  }

  @HostListener('window:resize', ['$event']) windowResize(event) {
  }


  @HostListener('document:keypress', ['$event']) documentKeyPress(event: KeyboardEvent) {
    if(event.charCode == 13){
      console.log(this.bookForm.controls.startTime)
      this.bookForm.controls.startTime.markAsTouched();
      this.bookForm.controls.startTime.markAsDirty();
      // this.bookForm.controls.startTime.updateValueAndValidity();
    }
    // this.untouchFields();
  }
  @HostListener('document:click', ['$event']) documentClick(event: MouseEvent) {
    // console.log(this.bookForm.get('startTime'));
    // console.log(this.bookForm.get('date').errors == null)
  }

  open(){
    this.bookForm.get('activePageCourt').setValue(this.activePageCourt);
    this.bookForm.get('user').setValue(this.user);

    if(this.selection){
	    this.bookForm.get('date').setValue(Moment(this.selection.date));
	    this.bookForm.get('startTime').setValue(this.selection.startTime);
	    this.bookForm.get('endTime').setValue(this.selection.endTime);
      this.stage = 2;
  	}
  	this.active=true;
  }

  close(){
    this.active=false;
  }

  // untouchFields(){
  //   for (const [key, value] of Object.entries(this.bookForm.controls)) {
  //     value.setValue('');
  //     value.markAsUntouched();
  //     console.log(key, value);
  //   }
  // }

  getErrorMessage(control){
  	if(control.errors){
	  	return this.errorMessages[Object.keys(control.errors)[0]];
  	}
  }



}
