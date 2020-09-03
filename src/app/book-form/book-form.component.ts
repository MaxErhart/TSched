import { Component, OnInit, HostListener } from '@angular/core';
import {FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, FormGroupDirective, NgForm, AbstractControl} from '@angular/forms';
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
	active = true;
	bookForm = new FormGroup({
		date: new FormControl(''),
		startTime: new FormControl(''),
		endTime: new FormControl(''),
		weekly: new FormControl(''),
		title: new FormControl(''),
		color: new FormControl(''),
		info: new FormControl(''),
	});

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('document:click', ['$event']) documentClick(event: MouseEvent) {
  }

  openPage2(){
  	this.page2Ative=true;
  }

  closePage2(){
  	this.page2Ative=false;
  }

  close(submit){
  	this.active = false;
  	if(submit){

  	}
  }

}
