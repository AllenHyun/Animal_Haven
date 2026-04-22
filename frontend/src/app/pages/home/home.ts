import {Component, OnInit, OnDestroy, inject, ChangeDetectorRef} from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);

  images: string[] = [
    'images/imagen_home.jpg',
    'images/imagen_home2.png',
    'images/imagen_home3.png',
    'images/imagen_home4.png',
    'images/imagen_home5.png',
  ];

  currentImageIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      this.cdr.detectChanges();
    }, 5000);
  }
}
