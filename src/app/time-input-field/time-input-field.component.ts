import { Component, OnInit, Input, OnDestroy, HostBinding,  ElementRef} from '@angular/core';
import { Subject } from 'rxjs';
import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {NgControl, FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { MatFormFieldControl,   } from '@angular/material/form-field';

class MyTel {
  constructor(public hours: number, public minutes: number) {}
}

@Component({
  selector: 'app-time-input-field',
  templateUrl: './time-input-field.component.html',
  styleUrls: ['./time-input-field.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: TimeInputFieldComponent}],
})
export class TimeInputFieldComponent implements MatFormFieldControl<MyTel>{

	parts: FormGroup;
	stateChanges = new Subject<void>();
	focused = false;

	static nextId = 0;
	@HostBinding() id = 'example-time-input-${TimeInputFieldComponent.nextId++}';
	errorState = false;
	controlType = 'example-time-input';
	@Input('aria-describedby') userAriaDescribedBy: string;

	@Input()
	get required() {
	  return this._required;
	}
	set required(req) {
	  this._required = coerceBooleanProperty(req);
	  this.stateChanges.next();
	}
	private _required = false;

	@HostBinding('class.floating')
	get shouldLabelFloat() {
	  return this.focused || !this.empty;
	}

	ngControl: NgControl = null;

	@Input()
	get placeholder() {
	  return this._placeholder;
	}
	set placeholder(plh) {
	  this._placeholder = plh;
	  this.stateChanges.next();
	}
	private _placeholder: string;

  @Input()
  get value(): MyTel | null {
    let n = this.parts.value;
    if (n.hours.length <= 2 && n.minutes.length <= 2) {
      return new MyTel(n.hours, n.minutes);
    }
    return null;
  }
  set value(tel: MyTel | null) {
    tel = tel || new MyTel(0, 0);
    this.parts.setValue({area: tel.hours, exchange: tel.minutes});
    this.stateChanges.next();
  }

  constructor(fb: FormBuilder, private fm: FocusMonitor, private elRef: ElementRef<HTMLElement>) {
    this.parts =  fb.group({
      'hours': '',
      'minutes': '',
    });
	  fm.monitor(elRef.nativeElement, true).subscribe(origin => {
	    this.focused = !!origin;
	    this.stateChanges.next();
	  });
  }

	get empty() {
	  let n = this.parts.value;
	  return !n.area && !n.exchange && !n.subscriber;
	}

	ngOnDestroy() {
	  this.stateChanges.complete();
	  this.fm.stopMonitoring(this.elRef.nativeElement);
	}

	@Input()
	get disabled(): boolean { return this._disabled; }
	set disabled(value: boolean) {
	  this._disabled = coerceBooleanProperty(value);
	  this._disabled ? this.parts.disable() : this.parts.enable();
	  this.stateChanges.next();
	}
	private _disabled = false;

	setDescribedByIds(ids: string[]) {
	  const controlElement = this.elRef.nativeElement
	    .querySelector('.example-time-input-container')!;
	  controlElement.setAttribute('aria-describedby', ids.join(' '));
	}

	onContainerClick(event: MouseEvent) {
	  if ((event.target as Element).tagName.toLowerCase() != 'input') {
	    this.elRef.nativeElement.querySelector('input').focus();
	  }
	}

}
