import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DynamicDateConverterDirective } from './dynamic-date-converter.directive';
import { CustomCalendarComponent } from './custom-calendar/custom-calendar.component'; // Import the component
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DatePickerComponent,
    DynamicDateConverterDirective,
    CustomCalendarComponent // Declare the component
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    DatePickerComponent,
    DynamicDateConverterDirective,
    CustomCalendarComponent // Export the component if used in other modules
  ]
})
export class MyDatePickerModule { }
