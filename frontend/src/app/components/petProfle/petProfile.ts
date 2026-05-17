import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pet-profile',
  imports: [],
  templateUrl: './petProfile.html',
  styleUrl: './petProfile.css',
})
export class PetProfile implements OnInit {
  @Input() pet: any;
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('This is the pet:', this.pet);
  }

  goToApplication() {
    this.close.emit();
    this.router.navigate(['/aplication'], {
      queryParams: {
        petId: this.pet.id,
        profileImg: this.pet.profileImg,
        petName: this.pet.name,
        shelter: this.pet.shelterId,
      },
    });
  }
}
