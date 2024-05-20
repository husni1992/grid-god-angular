import { Component, OnInit } from '@angular/core';
import { PostCard } from './models/Post.model';
import { Observable, combineLatest, map } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  selectPostCards,
  selectIsLoading,
  selectActivePostCardId,
  selectError,
} from './state';
import { PostGridPageState, PostCardPageActions } from './state';

interface ViewModel {
  postCards: PostCard[];
  isPostCardsLoading: boolean;
  activePostCardId: PostCard['id'] | null;
  error: any;
}

@Component({
  selector: 'app-post-grid-page',
  templateUrl: './post-grid-page.component.html',
  styleUrl: './post-grid-page.component.scss',
})
export class PostGridPageComponent implements OnInit {
  vm$: Observable<ViewModel> | undefined;

  constructor(private store: Store<PostGridPageState>) {
    this.vm$ = combineLatest([
      this.store.select(selectPostCards),
      this.store.select(selectIsLoading),
      this.store.select(selectActivePostCardId),
      this.store.select(selectError)
    ]).pipe(
      map(([postCards, isPostCardsLoading, activePostCardId, error]) => ({
        postCards,
        isPostCardsLoading,
        activePostCardId,
        error
      }))
    )
  }

  ngOnInit() {
    this.store.dispatch(PostCardPageActions.loadPostCards());
  }
}
