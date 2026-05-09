import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aplication',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './aplication.html',
  styleUrl: './aplication.css',
})
export class Aplication implements OnInit {
  petId: number | null = 0;
  petName: String | null = '';
  profileImg: String | null = '';

  applicationForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    type: new FormControl('foster'),
    notes: new FormControl(''),
  });

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.petId = parseInt(<string>this.route.snapshot.queryParamMap.get('petId'));
    this.petName = this.route.snapshot.queryParamMap.get('petName');
    this.profileImg = this.route.snapshot.queryParamMap.get('profileImg');
    console.log('Application for:', this.petName);
    console.log('Profile picture:', this.profileImg);
  }

  submitApplication() {
    console.log(this.applicationForm.value);
  }
}
