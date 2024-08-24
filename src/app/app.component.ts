import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedDate: Date | null = null;

  onDateSelected(date: Date): void {
    this.selectedDate = date;
  }
}
