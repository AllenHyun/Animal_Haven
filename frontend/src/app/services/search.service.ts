// search.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pet } from './pet.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  search(query: string) {
    return this.http.get<Pet[]>(`${this.apiUrl}/search/basicSearch?q=${query}`);
  }
}
