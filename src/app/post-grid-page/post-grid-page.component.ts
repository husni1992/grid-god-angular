import { Component } from '@angular/core';
import { PostCard } from './models/Post.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  selectPostCards,
  selectIsLoading,
  selectActivePostCardId,
} from './state';
import { PostGridPageState, PostCardPageActions } from './state';

@Component({
  selector: 'app-post-grid-page',
  templateUrl: './post-grid-page.component.html',
  styleUrl: './post-grid-page.component.scss',
})
export class PostGridPageComponent {
  postCards$: Observable<PostCard[]> = this.store.select(selectPostCards);
  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  activePostCardId$: Observable<PostCard['id'] | null> = this.store.select(
    selectActivePostCardId,
  );

  constructor(private store: Store<PostGridPageState>) {}

  ngOnInit() {
    this.store.dispatch(PostCardPageActions.loadPostCards());
  }
}
