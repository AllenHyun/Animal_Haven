import {ChangeDetectorRef, Component, inject} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  private cdr = inject(ChangeDetectorRef);

  signUpForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    postcode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
  }, {
    validators: this.passwordMatchValidator
  });

  isLoading = false;
  errorMessage = '';

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { passwordMismatch: true } : null;
  }

  signup() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.detectChanges();

    this.authService.register(this.signUpForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      },

      error: (err) => {
        this.isLoading = false;
        const backendError = err.error?.error || '';

        if (backendError.includes('User_email_key')) {
          this.errorMessage = 'This email is already in use. Please use another one.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
        this.cdr.detectChanges();
      },
    });
  }
}
