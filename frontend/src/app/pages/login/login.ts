import {ChangeDetectorRef, Component, inject} from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  isLoading = false;
  errorMessage = '';

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Logged in!');
        this.isLoading = false;
        this.cdr.detectChanges();
        this.router.navigate(['/']);
      },

      error: (err) => {
        this.isLoading = false;
        if (err.status === 401 || err.status === 404) {
          this.errorMessage = 'Incorrect email or password.';
        } else {
          this.errorMessage = 'Server error. Please try again later.';
        }
        this.cdr.detectChanges();
      },
    });
  }
}
