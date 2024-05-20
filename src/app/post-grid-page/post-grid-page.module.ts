import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PostGridPageComponent } from './post-grid-page.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { postGridPageReducer, PostGridPageEffects } from './state';
import { PostCardService } from './services/post.service';

@NgModule({
  declarations: [PostGridPageComponent, PostCardComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('postGridPageState', postGridPageReducer),
    EffectsModule.forFeature(PostGridPageEffects),
  ],
  providers: [
    PostCardService
  ]
})
export class PostGridPageModule { }
