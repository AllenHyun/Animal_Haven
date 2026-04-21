import { Component, OnInit } from '@angular/core';
import { Card } from '../../components/card/card';
import { PetProfile } from '../../components/petProfle/petProfile';
import { PetService } from '../../services/pet.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [Card, PetProfile, CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  pets$!: Observable<any[]>;
  loading = true;

  // Provisional hasta que se obtengan de la BD en forma de Enum
  animals: string[] = ['Cat', 'Dog'];

  breeds: string[] = [
    'Abyssinian',
    'Beagle',
    'Bengal',
    'Boxer',
    'Bulldog',
    'Dachshund',
    'Doberman',
    'Exotic Shorthair',
    'German Shepherd',
    'Golden Retriever',
    'Himalayan',
    'Husky',
    'Labrador',
    'Maine Coon',
    'Persian',
    'Pomeranian',
    'Ragdoll',
    'Rottweiler',
    'Russian Blue',
    'Shiba Inu',
    'Siamese',
    'Siberian',
    'Sphynx',
    'Tabby',
    'Tuxedo',
  ];

  ages: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  selectedAnimal: string = '';
  selectedBreed: string = '';
  selectedAge: string = '';

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.pets$ = this.petService.getPets();
  }

  onSearchChange(): void {
    console.log('Searching for:', this.selectedAnimal, this.selectedBreed, this.selectedAge);

    const currentFilters = {
      animal: this.selectedAnimal,
      breed: this.selectedBreed,
      age: this.selectedAge,
    };

    this.pets$ = this.petService.filterPets(currentFilters);
  }

  selectedPet: any = null;
}
