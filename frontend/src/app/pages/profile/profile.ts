import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UserService, UserProfile } from '../../services/user.service';
import { Card } from '../../components/card/card';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Pet } from '../../services/pet.service';
import { PetProfile } from '../../components/petProfle/petProfile';

@Component({
  selector: 'app-profile',
  imports: [Card, PetProfile, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  user!: UserProfile;

  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  adoptions: Pet[] = [];
  fosters: Pet[] = [];

  editDescription: boolean = false;

  descriptionForm: FormGroup = this.fb.group({
    userDescription: ['', [Validators.required, Validators.minLength(2)]],
  });

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
        for (let application of this.user.applications) {
          if (application.type === 'ADOPTION') {
            this.adoptions.push(application.pet);
          } else {
            this.fosters.push(application.pet);
          }
        }
        console.log('Logged adoptions and fosters:', this.adoptions, this.fosters);
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error al cargar los datos de usuario:', error),
    });
  }

  saveDescription() {
    if (this.descriptionForm.invalid) return;

    this.userService.updateDescription(this.descriptionForm.value).subscribe({
      next: (res: any) => {
        console.log('Saved new description');
        this.editDescription = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (err.status === 401) {
          alert('There was a problem with the submission of the new description');
        } else {
          alert('Server error. Please try again later.');
        }
      },
    });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  selectedPet: any = null;
}
