import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from './pet.service';

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  postcode: string;
  description: string;
  adoptedPets: Pet[];
  fosteredPets: Pet[];
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
}
