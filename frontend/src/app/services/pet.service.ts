import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

enum Gender {
  Male,
  Female,
}

enum Animal {
  Cat,
  Dog,
}
export interface Pet {
  id: number;
  name: string;
  breed: string;
  age: number;
  gender: Gender;
  animalType: Animal;
  profileImg: string;
  description: string;
  shelterId: number;
}
@Injectable({
  providedIn: 'root',
})
export class PetService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/pets/all`);
  }

  filterPets(filters?: { animal?: string; breed?: string; age?: string }): Observable<any[]> {
    let params = new HttpParams();

    if (filters) {
      if (filters.animal) params = params.set('animalType', filters.animal);
      if (filters.breed) params = params.set('breed', filters.breed);
      if (filters.age) params = params.set('age', filters.age);
    }
    return this.http.get<Pet[]>(`${this.apiUrl}/search/filter`, { params });
  }

  getDogBreeds(): Observable<any[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/pets/dogBreeds`);
  }

  getCatBreeds(): Observable<any[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/pets/catBreeds`);
  }
}
