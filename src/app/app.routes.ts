import { Routes } from '@angular/router';
import { PostGridPageComponent } from './pages/post-grid-page/post-grid-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/post-list', pathMatch: 'full' },
  { path: 'post-list', component: PostGridPageComponent },
];
