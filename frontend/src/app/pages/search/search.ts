import { Component, OnInit, inject } from '@angular/core';
import { Card } from '../../components/card/card';
import { PetProfile } from '../../components/petProfle/petProfile';
import { PetService } from '../../services/pet.service';
import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute } from '@angular/router';

interface Pet {}
@Component({
  selector: 'app-search',
  imports: [Card, PetProfile, CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  loading = true;
  animals: string[] = ['Cat', 'Dog'];
  breeds$!: Observable<any[]>;

  ages: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  selectedAnimal: string = '';
  selectedBreed: string = '';
  selectedAge: string = '';

  private filters$ = new BehaviorSubject({
    animal: '',
    breed: '',
    age: '',
  });

  private route = inject(ActivatedRoute);
  private searchService = inject(SearchService);

  pets$ = combineLatest([
    this.route.queryParams.pipe(map((params) => params['q'] || '')),
    this.filters$,
  ]).pipe(
    switchMap(([q, filters]) => {
      const hasQuery = q && q.length >= 3;

      const hasFilters = filters.animal || filters.breed || filters.age;
      if (hasFilters) {
        return this.petService.filterPets(filters);
      }
      if (hasQuery) {
        console.log('Query:', q, 'Filters:', filters);
        return this.searchService.search(q);
      }

      return this.petService.getPets();
    }),
  );

  constructor(private petService: PetService) {}

  onSearchChange(): void {
    console.log('Searching for:', this.selectedAnimal, this.selectedBreed, this.selectedAge);

    if (this.selectedAnimal === 'Dog') this.breeds$ = this.petService.getDogBreeds();
    else if (this.selectedAnimal === 'Cat') this.breeds$ = this.petService.getCatBreeds();

    this.filters$.next({
      animal: this.selectedAnimal,
      breed: this.selectedBreed,
      age: this.selectedAge,
    });
  }

  selectedPet: any = null;
}
