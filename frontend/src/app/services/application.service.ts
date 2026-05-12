import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  saveApplication(application: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/application/save`, application);
  }
}
