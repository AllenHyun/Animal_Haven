import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getPets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'pets/all');
  }

  filterPets(filters?: { animal?: string; breed?: string; age?: string }): Observable<any[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.animal) params = params.set('animalType', filters.animal);
      if (filters.breed) params = params.set('breed', filters.breed);
      if (filters.age) params = params.set('age', filters.age);
    }
    return this.http.get<any[]>(this.apiUrl + 'search/filter', { params });
  }
}
