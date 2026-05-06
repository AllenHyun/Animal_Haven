import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  bookings = [
    { date: 'Nov 20, 2026', time: '10:30 AM', user: 'Carlos Ruiz', animal: 'Thor' },
    { date: 'Nov 22, 2026', time: '17:00 PM', user: 'Ana Smith', animal: 'Luna' },
    { date: 'Nov 25, 2026', time: '09:15 AM', user: 'David Vera', animal: 'Boby' }
  ];

  applications = [
    { name: 'Maria Garcia', type: 'Adopt', animal: 'Pipo', location: 'Madrid, ES' },
    { name: 'John Doe', type: 'Foster', animal: 'Kira', location: 'Valencia, ES' },
    { name: 'Lucia Sanz', type: 'Adopt', animal: 'Milo', location: 'Barcelona, ES' }
  ];
}
