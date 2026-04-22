import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking implements OnInit {
  shelters$!: Observable<any[]>;
  timeFrames$!: Observable<any[]>;
  isShelterSelected = false;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.shelters$ = this.bookingService.getShelters();
  }

  onShelterChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const shelterId = selectElement.value;

    if (shelterId) {
      this.isShelterSelected = true;
      this.timeFrames$ = this.bookingService.getTimeFrames(parseInt(shelterId));
    } else {
      this.isShelterSelected = false;
    }
  }
}
