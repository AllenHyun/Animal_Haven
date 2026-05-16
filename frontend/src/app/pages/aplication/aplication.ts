import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';

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
  locationId: number | null = 0;

  applicationForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    type: new FormControl('foster'),
    notes: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationService,
  ) {}

  ngOnInit(): void {
    this.petId = parseInt(<string>this.route.snapshot.queryParamMap.get('petId'));
    this.petName = this.route.snapshot.queryParamMap.get('petName');
    this.profileImg = this.route.snapshot.queryParamMap.get('profileImg');
    this.locationId = parseInt(<string>this.route.snapshot.queryParamMap.get('location'));
    console.log('Application for:', this.petName);
    console.log('Profile picture:', this.profileImg);
  }

  submitApplication() {
    console.log(this.applicationForm.value);
    const payload = {
      ...this.applicationForm.value,
      petId: this.petId,
      location: this.locationId,
    };
    this.applicationService.saveApplication(payload).subscribe({
      next: () => {
        alert('Application for ' + this.petName + ' submitted!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => console.error('Error al guardar', err),
    });
  }
}
