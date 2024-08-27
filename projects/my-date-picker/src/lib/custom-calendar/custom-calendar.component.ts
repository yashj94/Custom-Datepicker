import { Component, Output, EventEmitter } from '@angular/core';
import {  HostListener } from '@angular/core';

@Component({
  selector: 'app-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.scss']
})
export class CustomCalendarComponent {
  @Output() dateSelected = new EventEmitter<Date>();
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  daysInMonth: number[] = [];
  monthYear: string = '';
  currentDate: Date = new Date(); // Track today's date
  selectedDate: Date | null = null; // Track selected date
  months: { index: number, name: string }[] = [];
  years: number[] = [];

  ngOnInit(): void {
    this.initializeMonthNames();
    this.initializeYearRange();
    this.updateMonthYear();
    this.generateCalendar();
  }

  initializeMonthNames(): void {
    this.months = [
      { index: 0, name: 'January' },
      { index: 1, name: 'February' },
      { index: 2, name: 'March' },
      { index: 3, name: 'April' },
      { index: 4, name: 'May' },
      { index: 5, name: 'June' },
      { index: 6, name: 'July' },
      { index: 7, name: 'August' },
      { index: 8, name: 'September' },
      { index: 9, name: 'October' },
      { index: 10, name: 'November' },
      { index: 11, name: 'December' }
    ];
  }

  initializeYearRange(): void {
    const startYear = 1950;
    const endYear = 2100;
    this.years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  }

  generateCalendar(): void {
    this.daysInMonth = [];
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInThisMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

     for (let i = 0; i < firstDayOfMonth; i++) {
      this.daysInMonth.push(null!);
    }

     for (let i = 1; i <= daysInThisMonth; i++) {
      this.daysInMonth.push(i);
    }
  }

  updateMonthYear(): void {
    this.monthYear = new Date(this.currentYear, this.currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  selectDate(day: number): void {
    this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
    this.dateSelected.emit(this.selectedDate);
  }
  

  isSelected(day: number): boolean {
    if (!this.selectedDate) return false;
    return this.selectedDate.getDate() === day &&
           this.currentMonth === this.selectedDate.getMonth() &&
           this.currentYear === this.selectedDate.getFullYear();
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.updateMonthYear();
    this.generateCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.updateMonthYear();
    this.generateCalendar();
  }

  prevYear(): void {
    this.currentYear--;
    this.updateMonthYear();
    this.generateCalendar();
  }

  nextYear(): void {
    this.currentYear++;
    this.updateMonthYear();
    this.generateCalendar();
  }

  onMonthChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.currentMonth = Number(selectElement.value);
    this.updateMonthYear();
    this.generateCalendar();
  }

  onYearChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.currentYear = Number(selectElement.value);
    this.updateMonthYear();
    this.generateCalendar();
  }

  showCalendar: boolean = false;
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.input-wrapper')) {
      this.showCalendar = false;
    }
  }

  
}
