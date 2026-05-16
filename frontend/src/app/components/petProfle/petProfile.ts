import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pet-profile',
  imports: [],
  templateUrl: './petProfile.html',
  styleUrl: './petProfile.css',
})
export class PetProfile {
  @Input() pet: any;
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) {}

  goToApplication() {
    this.close.emit();
    this.router.navigate(['/aplication'], {
      queryParams: {
        petId: this.pet.id,
        profileImg: this.pet.profileImg,
        petName: this.pet.name,
        location: this.pet.shelterId,
      },
    });
  }
}
