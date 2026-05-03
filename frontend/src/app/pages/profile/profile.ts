import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UserService, UserProfile } from '../../services/user.service';
import { Card } from '../../components/card/card';
import { PetProfile } from '../../components/petProfle/petProfile';

@Component({
  selector: 'app-profile',
  imports: [Card, PetProfile],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  user!: UserProfile;

  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
        this.cdr.detectChanges();
      },
      error: (error) => console.error('Error al cargar los datos de usuario:', error),
    });
  }

  selectedPet: any = null;
}
