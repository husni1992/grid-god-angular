import { createAction, props } from '@ngrx/store';
import { PostGridPageState } from './post-card-page.reducer';

export const loadPostCards = createAction('[Cards Page] Load Post Cards');
export const loadPostCardsSuccess = createAction(
  '[Cards Page] Load Post Cards Success',
  props<{ postCards: PostGridPageState['postCards'] }>(),
);
export const loadPostCardsFailure = createAction(
  '[Cards Page] Load Post Cards Failure',
  props<{ error: any }>(),
);

export const setActiveCard = createAction(
  '[Cards Page] Activate Card',
  props<{ activePostCardId: PostGridPageState['activePostCardId'] }>(),
);
