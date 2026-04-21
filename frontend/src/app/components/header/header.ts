import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(public router: Router) {}
  private authService = inject(AuthService);

  isLoggedIn$ = this.authService.isLoggedIn$;

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
