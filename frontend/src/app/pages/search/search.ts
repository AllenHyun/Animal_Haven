import { Component, OnInit } from '@angular/core';
import { Card } from '../../components/card/card';
import { PetProfile } from '../../components/petProfle/petProfile';
import { PetService } from '../../services/pet.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [Card, PetProfile, CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  pets$!: Observable<any[]>;
  loading = true;

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.pets$ = this.petService.getPets();
  }

  selectedPet: any = null;
}
