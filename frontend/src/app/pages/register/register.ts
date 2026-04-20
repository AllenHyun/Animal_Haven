import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  signUpForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    postcode: ['', [Validators.required]],
  });

  isLoading = false;
  errorMessage = '';

  signup() {
    if (this.signUpForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.signUpForm.value).subscribe({
      next: (response) => {
        console.log('Backend says:', response);
        this.isLoading = false;
        this.router.navigate(['/login']);
      },

      error: (err) => {
        console.error('Registration failed:', err);
        this.isLoading = false;
        this.errorMessage = err.error?.error || 'An unexpected error occurred.';
      },
    });
  }
}
