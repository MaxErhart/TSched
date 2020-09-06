import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// material components
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { GridComponent } from './grid/grid.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatNativeDateModule} from '@angular/material/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe);


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { BookFormComponent } from './book-form/book-form.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { EventComponent } from './event/event.component';
import { NewEventButtonComponent } from './new-event-button/new-event-button.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { TimelineComponent } from './timeline/timeline.component';

export const DateFormats = {
        parse: {
            dateInput: ['DD-MM-YYYY']
        },
        display: {
            dateInput: 'DD-MM-YYYY',
            monthYearLabel: 'MMM YYYY',
            dateA11yLabel: 'LL',
            monthYearA11yLabel: 'MMMM YYYY',
        },
    };

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    GridComponent,
    BookFormComponent,
    TimepickerComponent,
    EventComponent,
    NewEventButtonComponent,
    PaginatorComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatMenuModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatRippleModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DateFormats },
    { provide: LOCALE_ID, useValue: "de-de" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
