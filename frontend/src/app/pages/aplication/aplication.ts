import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-aplication',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './aplication.html',
  styleUrl: './aplication.css',
})
export class Aplication {
  applicationForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    type: new FormControl('foster'),
    notes: new FormControl('')
  });

  submitApplication() {
    console.log(this.applicationForm.value);
  }
}
