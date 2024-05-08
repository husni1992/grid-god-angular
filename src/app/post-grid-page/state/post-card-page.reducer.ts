import { createReducer, on } from '@ngrx/store';

import * as Actions from './post-card-page.actions';
import { PostCard } from '../models/Post.model';

export interface PostGridPageState {
  postCards: PostCard[];
  isLoading: boolean;
  activePostCardId: PostCard['id'] | null;
}

export const initialState: PostGridPageState = {
  postCards: [],
  isLoading: false,
  activePostCardId: null,
};

export const postGridPageReducer = createReducer(
  initialState,

  on(Actions.setActiveCard, (state, { activePostCardId }) => ({
    ...state,
    activePostCardId,
  })),

  on(Actions.loadPostCardsSuccess, (state, { postCards }) => ({
    ...state,
    postCards,
    isLoading: false,
  })),
);
