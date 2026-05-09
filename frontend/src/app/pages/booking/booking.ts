import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingService } from '../../services/booking.service.js';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

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
  private router = inject(Router);

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
      timeFrame: ['', [Validators.required]],
      shelterId: ['', [Validators.required]],
    },
    {
      validators: this.emailMatchValidator,
    },
  );

  ngOnInit(): void {
    this.shelters$ = this.bookingService.getShelters();

    this.bookingForm.get('date')?.valueChanges.subscribe(() => {
      this.tryLoadTimeFrames();
    });
  }

  // =========================
  // CARGA SEGURA HORARIOS
  // =========================

  tryLoadTimeFrames() {
    const date = this.bookingForm.get('date')?.value;
    const shelterId = Number(this.bookingForm.get('shelterId')?.value);
    console.log(date);
    const timeframe = {
      date: date,
      id: shelterId,
    };
    if (!date || isNaN(shelterId)) {
      this.timeFrames$ = new Observable<any[]>();
      return;
    }

    this.timeFrames$ = this.bookingService.getTimeFrames(timeframe);

    // reset selección
    this.bookingForm.patchValue({ timeFrame: null });
  }

  // =========================
  // SHELTER CHANGE
  // =========================
  onShelterChange(event: Event) {
    const id = Number((event.target as HTMLSelectElement).value);

    if (isNaN(id)) {
      this.isShelterSelected = false;
      return;
    }

    this.isShelterSelected = true;

    this.bookingForm.patchValue({ shelterId: id });

    this.tryLoadTimeFrames();
  }

  // =========================
  // SELECT TIME
  // =========================
  selectTime(time: any) {
    this.bookingForm.get('timeFrame')?.setValue(time.timeFrame);
  }

  // =========================
  // VALIDATOR EMAIL
  // =========================
  emailMatchValidator(control: AbstractControl) {
    return control.get('email')?.value === control.get('confirmEmail')?.value
      ? null
      : { emailMismatch: true };
  }

  // =========================
  // SUBMIT
  // =========================
  submitBooking() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      this.cdr.detectChanges();
      return;
    }

    const data = this.bookingForm.getRawValue();

    const sendobject = {
      name: data.firstName,
      email: data.email,
      date: new Date(data.date).toISOString(),
      shelterId: Number(data.shelterId),
      timeFrame: data.timeFrame,
    };

    this.bookingService.saveBooking(sendobject).subscribe({
      next: () => {
        alert('¡Reserva realizada!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => console.error('Error al guardar', err),
    });
  }
}
