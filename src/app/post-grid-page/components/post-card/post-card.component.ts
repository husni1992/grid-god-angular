import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import classNames from 'classnames';

import { PostCardPageActions } from '../../state';

import { DEFAULT_PROPERTY_TO_DISPLAY, PROPERTIES_OF_POST } from './constants';
import {
  calculateHeightBasedOnWidthAndPadding,
  getNextKeyOfObject,
} from './utils';
import { PostCard } from '../../models/Post.model';
import { Store } from '@ngrx/store';
import { PostGridPageState } from '../../state';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  @Input() post!: PostCard;
  @Input() activePostCardId: PostCard['id'] | null = null;
  @Output() setActivePost = new EventEmitter<PostCard['id']>();

  @ViewChild('postCardContainer') selfElement: ElementRef | undefined;

  isActive: boolean = false;
  currentProperty: keyof PostCard = DEFAULT_PROPERTY_TO_DISPLAY;

  constructor(private store: Store<PostGridPageState>) {}

  ngOnChanges() {
    this.updateActiveStatus();
    this.updateDisplayProperty();
  }

  ngAfterViewInit() {
    if (this.selfElement) {
      const heightOfSelf = calculateHeightBasedOnWidthAndPadding(
        this.selfElement,
      );
      this.setElementHeight(this.selfElement, heightOfSelf);
    }
  }

  get postCardClasses() {
    return classNames('post-card-container', {
      active: this.isActive,
    });
  }

  updateActiveStatus() {
    this.isActive = this.post.id === this.activePostCardId;
  }

  setElementHeight(element: ElementRef, height: number) {
    element.nativeElement.style.height = `${height}px`;
  }

  rotateDisplayProperty() {
    this.currentProperty = getNextKeyOfObject(
      this.currentProperty,
      PROPERTIES_OF_POST,
    );
  }

  updateDisplayProperty() {
    if (this.post.id !== this.activePostCardId) {
      this.currentProperty = DEFAULT_PROPERTY_TO_DISPLAY;
    }
  }

  onClick() {
    if (this.post.id !== this.activePostCardId) {
      this.setActivePost.emit(this.post.id);

      this.store.dispatch(
        PostCardPageActions.setActiveCard({ activePostCardId: this.post.id }),
      );
    }

    this.rotateDisplayProperty();
  }
}
