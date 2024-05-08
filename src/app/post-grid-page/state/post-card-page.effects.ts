import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { PostCardService } from '../services/post.service';
import * as PostCardPageActions from './post-card-page.actions';

@Injectable()
export class PostGridPageEffects {
  loadPostCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostCardPageActions.loadPostCards),
      switchMap(() =>
        this.postCardService.getPosts().pipe(
          map((postCards) =>
            PostCardPageActions.loadPostCardsSuccess({
              postCards,
            }),
          ),
          catchError((error) =>
            of(PostCardPageActions.loadPostCardsFailure({ error })),
          ),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private postCardService: PostCardService,
  ) {}
}
