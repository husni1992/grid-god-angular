import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import classNames from 'classnames';

import { DEFAULT_PROPERTY_TO_DISPLAY, PROPERTIES_OF_POST } from './constants';
import {
  calculateHeightBasedOnWidthAndPadding,
  getNextKeyOfObject,
} from './utils';
import { PostCard } from '../models/Post.model';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  @Input() post: PostCard | undefined;
  @Input() activePostId: PostCard['id'] | undefined;
  @Output() setActivePost = new EventEmitter<PostCard['id']>();

  @ViewChild('postCardContainer') selfElement: ElementRef | undefined;

  isActive: boolean = false;
  currentProperty: keyof PostCard = DEFAULT_PROPERTY_TO_DISPLAY;

  ngOnChanges() {
    this.updateActiveStatus();
    this.updateDisplayProperty();
  }

  ngAfterViewInit() {
    if (this.selfElement) {
      const heightOfSelf = calculateHeightBasedOnWidthAndPadding(
        this.selfElement
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
    this.isActive = this.post?.id === this.activePostId;
  }

  setElementHeight(element: ElementRef, height: number) {
    element.nativeElement.style.height = `${height}px`;
  }

  rotateDisplayProperty() {
    this.currentProperty = getNextKeyOfObject(
      this.currentProperty,
      PROPERTIES_OF_POST
    );
  }

  updateDisplayProperty() {
    if (this.post?.id !== this.activePostId) {
      this.currentProperty = DEFAULT_PROPERTY_TO_DISPLAY;
    }
  }

  onClick() {
    if (this.post?.id !== this.activePostId) {
      this.setActivePost.emit(this.post?.id);
    }

    this.rotateDisplayProperty();
  }
}
