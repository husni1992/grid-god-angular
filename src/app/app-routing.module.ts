import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostGridPageComponent } from './post-grid-page/post-grid-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/post-card-grid', pathMatch: 'full' },
  { path: 'post-card-grid', component: PostGridPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
