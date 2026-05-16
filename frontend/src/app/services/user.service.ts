import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from './pet.service';

interface Application {
  type: string;
  pet: Pet;
}
export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  postcode: string;
  description: string;
  applications: Application[];
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/user/profile`);
  }

  updateDescription(description: String): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/profile/edit`, description);
  }
}
