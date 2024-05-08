import { createAction, props } from '@ngrx/store';
import { PostCard } from '../models/Post.model';

export const loadPostCards = createAction('[Cards Page] Load Post Cards');
export const loadPostCardsSuccess = createAction(
  '[Cards Page] Load Post Cards Success',
  props<{ postCards: PostCard[] }>(),
);
export const loadPostCardsFailure = createAction(
  '[Cards Page] Load Post Cards Failure',
  props<{ error: any }>(),
);

export const setActiveCard = createAction(
  '[Cards Page] Activate Card',
  props<{ activePostCardId: PostCard['id'] }>(),
);
