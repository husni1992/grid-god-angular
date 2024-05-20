import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostGridPageState } from '.';

// Feature selector to access the entire feature state
export const selectPostGridPageState =
  createFeatureSelector<PostGridPageState>('postGridPageState');

export const selectPostCards = createSelector(
  selectPostGridPageState,
  (state) => state.postCards,
);

export const selectIsLoading = createSelector(
  selectPostGridPageState,
  (state) => state.isLoading,
);

export const selectActivePostCardId = createSelector(
  selectPostGridPageState,
  (state) => state.activePostCardId,
);

export const selectError = createSelector(selectPostGridPageState, state => state.error)