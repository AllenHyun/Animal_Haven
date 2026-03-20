import { Component } from '@angular/core';
import {Header} from '../../components/header/header';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [Header],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {}
