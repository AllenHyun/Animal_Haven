import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pet-profile',
  imports: [],
  templateUrl: './petProfile.html',
  styleUrl: './petProfile.css',
})
export class PetProfile {
  @Input() pet: any;
  @Output() close = new EventEmitter<void>();
}
