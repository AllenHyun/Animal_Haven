import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UserService, UserProfile } from '../../services/user.service';
import { Card } from '../../components/card/card';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [Card],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  user!: UserProfile;

  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  editDescription: boolean = false;

  descriptionForm: FormGroup = this.fb.group({
    userDescription: ['', [Validators.required, Validators.minLength(2)]],
  });

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error al cargar los datos de usuario:', error),
    });
  }

  saveDescription() {}
  selectedPet: any = null;
}
