import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { PostGridPageComponent } from './post-grid-page.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { StoreModule } from '@ngrx/store';
import { postGridPageReducer, PostGridPageEffects } from './state';

@NgModule({
  declarations: [PostGridPageComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    PostCardComponent,
    StoreModule.forFeature('postGridPageState', postGridPageReducer),
    EffectsModule.forFeature(PostGridPageEffects),
  ],
})
export class PostGridPageModule {}
