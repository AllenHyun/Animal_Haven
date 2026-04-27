import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { FormControl, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    RouterModule,
    CommonModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  searchInput = new FormControl('');

  private route = inject(ActivatedRoute);

  constructor(public router: Router) {
    this.searchInput.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.router.navigate(['/search'], {
          queryParams: { q: value },
        });
      });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const q = params['q'] || '';
      this.searchInput.setValue(q, { emitEvent: false });
    });
  }

  private authService = inject(AuthService);

  isLoggedIn$ = this.authService.isLoggedIn$;

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
