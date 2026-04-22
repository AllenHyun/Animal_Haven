import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking implements OnInit {
  private fb = inject(FormBuilder);
  private bookingService = inject(BookingService);
  private cdr = inject(ChangeDetectorRef);

  shelters$!: Observable<any[]>;
  timeFrames$!: Observable<any[]>;
  isShelterSelected = false;

  bookingForm: FormGroup = this.fb.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required]],
      date: ['', [Validators.required]],
    },
    {
      validators: this.emailMatchValidator,
    },
  );

  constructor() {}

  ngOnInit(): void {
    this.shelters$ = this.bookingService.getShelters();
  }

  emailMatchValidator(control: AbstractControl) {
    const email = control.get('email');
    const confirm = control.get('confirmEmail');
    return email && confirm && email.value !== confirm ? { emailMismatch: true } : null;
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

  submitBooking() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      this.cdr.detectChanges();
      return;
    }
    console.log('Formulario válido', this.bookingForm.value);
  }
}
