import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-new-event-button',
  templateUrl: './new-event-button.component.html',
  styleUrls: ['./new-event-button.component.scss']
})
export class NewEventButtonComponent implements OnInit {

	@Input() user;
  constructor() { }

  ngOnInit(): void {
  }

}
