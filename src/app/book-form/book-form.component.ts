import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

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

}
