import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'pet-profile',
    imports: [],
    templateUrl: './profile.html',
    styleUrl: './profile.css',
})
export class PetProfile {
    @Input() pet: any;
    @Output() close = new EventEmitter<void>()
}