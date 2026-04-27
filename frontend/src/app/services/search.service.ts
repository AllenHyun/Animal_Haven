// search.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  search(query: string) {
    return this.http.get<any[]>(`${this.apiUrl}/search/basicSearch?q=${query}`);
  }
}
