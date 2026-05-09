import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  bookings$!: Observable<any[]>;
  applications$!: Observable<any[]>;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.bookings$ = this.dashboardService.getBookings();
    this.applications$ = this.dashboardService.getApplications();
  }
}
