import { Routes } from '@angular/router';
import {Search} from './pages/search/search';
import {Register} from './pages/register/register';
import {Home} from './pages/home/home';
export const routes: Routes = [
  {path: '',component:Home},
  {path: 'sign-up', component: Register},
  {path: 'search', component: Search}
];
