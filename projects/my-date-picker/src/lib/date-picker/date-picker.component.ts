import { Component, Input, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  @Input() format: string = 'DD-MM-YYYY';
  selectedDate: string = '';
  showCalendar: boolean = false;
  selectedFormat: string = '';

  dateFormats: string[] = [
    'DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY/MM/DD', 'YYYY/DD/MM',
    'DD-MM-YYYY', 'MM-DD-YYYY', 'YYYY-MM-DD',
    'DD-MON-YYYY', 'YYYY-MON-DD',
    'DD.MM.YYYY', 'MM.DD.YYYY', 'YYYY.MM.DD',
    'DD-MMM-YYYY', 'MMM-DD-YYYY'
  ];

  monthNamesShort: string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  constructor(private dataService: DataserviceService) {}

  ngOnInit(): void {
    this.dataService.getDateFormat().subscribe(
      (response: string) => {
        let receivedFormat;
        try {
          const parsedResponse = JSON.parse(response);
          receivedFormat = parsedResponse.format;
        } catch (error) {
          console.error('Failed to parse API response', error);
          receivedFormat = this.format;
        }

        if (this.dateFormats.includes(receivedFormat)) {
          this.format = receivedFormat;
        }

        if (this.selectedDate) {
          this.selectedDate = this.formatDate(this.parseDate(this.selectedDate), this.format);
        }
      },
      (error) => {
        this.format = this.format;
      }
    );
  }

  onDateSelected(date: Date): void {
    this.selectedDate = this.formatDate(date, this.format);
    this.showCalendar = false;
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
  }

  formatDate(date: Date, format: string): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    let separator = format.includes('/') ? '/' : (format.includes('-') ? '-' : '.');

    switch (format) {
      case 'DD/MM/YYYY':
      case 'DD-MM-YYYY':
      case 'DD.MM.YYYY':
        return `${day}${separator}${month}${separator}${year}`;
      case 'MM/DD/YYYY':
      case 'MM-DD-YYYY':
      case 'MM.DD.YYYY':
        return `${month}${separator}${day}${separator}${year}`;
      case 'YYYY/MM/DD':
      case 'YYYY-MM-DD':
      case 'YYYY.MM.DD':
        return `${year}${separator}${month}${separator}${day}`;
      case 'YYYY/DD/MM':
        return `${year}${separator}${day}${separator}${month}`;
      case 'DD-MON-YYYY':
      case 'DD-MMM-YYYY':
        return `${day}-${this.monthNamesShort[date.getMonth()]}-${year}`;
      case 'MMM-DD-YYYY':
        return `${this.monthNamesShort[date.getMonth()]}-${day}-${year}`;
      case 'YYYY-MON-DD':
        return `${year}-${this.monthNamesShort[date.getMonth()]}-${day}`;
      default:
        return `${year}${separator}${month}${separator}${day}`;
    }
  }

  parseDate(dateStr: string): Date {
    const format = this.format;
    let day: number = 1;
    let month: number = 1;
    let year: number = 1970;

    if (format.includes('MON') || format.includes('MMM')) {
      let [part1, part2, part3] = dateStr.split(format.includes('-') ? '-' : format.includes('.') ? '.' : '/');

      if (format.startsWith('MMM') || format.startsWith('MON')) {
        [part2, part1, part3] = [part1, part2, part3];
      }

      month = this.monthNamesShort.indexOf(part2) + 1;
      day = parseInt(part1, 10);
      year = parseInt(part3, 10);
    } else {
      const parts = dateStr.split(format.includes('-') ? '-' : format.includes('.') ? '.' : '/').map(Number);

      switch (format) {
        case 'DD/MM/YYYY':
        case 'DD-MM-YYYY':
        case 'DD.MM.YYYY':
          [day, month, year] = parts;
          break;
        case 'MM/DD/YYYY':
        case 'MM-DD-YYYY':
        case 'MM.DD.YYYY':
          [month, day, year] = parts;
          break;
        case 'YYYY/MM/DD':
        case 'YYYY-MM-DD':
        case 'YYYY.MM.DD':
          [year, month, day] = parts;
          break;
        case 'YYYY/DD/MM':
          [year, day, month] = parts;
          break;
      }
    }

    return new Date(year, month - 1, day);
  }
}
