import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import classNames from 'classnames';
import { Store } from '@ngrx/store';

import { PostCardPageActions } from '../../state';
import { PostCard } from '../../models/Post.model';
import { PostGridPageState } from '../../state';
import { DEFAULT_PROPERTY_TO_DISPLAY, PROPERTIES_OF_POST } from './constants';
import {
  calculateHeightBasedOnWidthAndPadding,
  getNextKeyOfObject,
} from './utils';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  @Input() post!: PostCard;
  @Input() activePostCardId: PostCard['id'] | null = null;

  @ViewChild('postCardContainer') private selfElement: ElementRef | undefined;

  displayedProperty: keyof PostCard = DEFAULT_PROPERTY_TO_DISPLAY;

  constructor(private store: Store<PostGridPageState>) {}

  ngOnChanges(): void {
    this.updateDisplayProperty();
  }

  ngAfterViewInit(): void {
    this.setPostCardElementHeight();
  }

  /**
   * Checks if the current post card is the active one.
   * A post card is considered active if its id matches the activePostCardId.
   */
  private get isCurrentPostCardActive() {
    return this.post.id === this.activePostCardId;
  }

  get postCardClasses(): string {
    return classNames('post-card-container', {
      active: this.isCurrentPostCardActive,
    });
  }

  /**
   * Sets the height of the post card element based on its width and padding.
   */
  private setPostCardElementHeight() {
    if (this.selfElement) {
      const heightOfSelf = calculateHeightBasedOnWidthAndPadding(
        this.selfElement,
      );

      this.selfElement.nativeElement.style.height = `${heightOfSelf}px`;
    }
  }

  private updateDisplayProperty(): void {
    if (!this.isCurrentPostCardActive) {
      this.displayedProperty = DEFAULT_PROPERTY_TO_DISPLAY;
    }
  }

  private rotateDisplayProperty(): void {
    this.displayedProperty = getNextKeyOfObject(
      this.displayedProperty,
      PROPERTIES_OF_POST,
    );
  }

  private setActivePostCard(postId: PostCard['id']): void {
    this.store.dispatch(
      PostCardPageActions.setActiveCard({ activePostCardId: postId }),
    );
  }

  onClick(): void {
    if (this.post.id !== this.activePostCardId) {
      this.setActivePostCard(this.post.id);
    }

    this.rotateDisplayProperty();
  }
}
