import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventButtonComponent } from './new-event-button.component';

describe('NewEventButtonComponent', () => {
  let component: NewEventButtonComponent;
  let fixture: ComponentFixture<NewEventButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEventButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEventButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
