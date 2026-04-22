import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  saveBooking(booking: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/booking/save`, booking);
  }

  getTimeFrames(shelterId: number): Observable<any[]> {
    let params = new HttpParams();
    params.set('shelterId', shelterId);
    return this.http.get<any[]>(`${this.apiUrl}/booking/getTimeFrames`, { params });
  }

  getShelters(): Observable<any[]> {
    console.log(`${this.apiUrl}/booking/getShelters`);
    return this.http.get<any[]>(`${this.apiUrl}/booking/getShelters`);
  }
}
