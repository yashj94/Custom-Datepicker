import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {
  private apiUrl = 'http://localhost:5120/DateFormat';

  constructor(private http: HttpClient) { }

  getDateFormat(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }
}
