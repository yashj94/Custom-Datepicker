import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  selectedDate: string = '';  
  selectedFormat: string = ''; 
  showCalendar: boolean = false;
  dateFormats: string[] = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY/MM/DD', 'YYYY/DD/MM'];

  constructor(private dataService: DataserviceService) {}

  ngOnInit(): void {
    this.dataService.getDateFormat().subscribe(
      (response: string) => {
        console.log('API Response:', response);
        let receivedFormat;
        try {
          const parsedResponse = JSON.parse(response);
          receivedFormat = parsedResponse.format;
        } catch (error) {
          console.error('Failed to parse API response', error);
          receivedFormat = this.dateFormats[0]; // Default format in case of error
        }
  
        if (this.dateFormats.includes(receivedFormat)) {
          this.selectedFormat = receivedFormat;
        } else {
          console.warn(`Received format "${receivedFormat}" is not valid. Setting default format.`);
          this.selectedFormat = this.dateFormats[0];
        }
  
        if (this.selectedDate) {
          this.selectedDate = this.formatDate(this.parseDate(this.selectedDate), this.selectedFormat);
        }
      },
      (error) => {
        console.error('Failed to fetch date format', error);
        this.selectedFormat = this.dateFormats[0]; // Default format on error
      }
    );
  }
  

  onDateSelected(date: Date): void {
    this.selectedDate = this.formatDate(date, this.selectedFormat);
    this.showCalendar = false; // Hide the calendar when a date is selected
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
  }

  formatDate(date: Date, format: string): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0-based
    const day = ('0' + date.getDate()).slice(-2);

    switch (format) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      case 'YYYY/MM/DD':
        return `${year}/${month}/${day}`;
      case 'YYYY/DD/MM':
        return `${year}/${day}/${month}`;
      default:
        return `${year}/${month}/${day}`;
    }
  }

  // Helper function to parse date string back into a Date object
  parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  }
}
