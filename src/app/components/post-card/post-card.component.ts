import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import classNames from 'classnames';

import { Post } from '../../models/Post.model';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  @Input() post: Post | undefined;
  @Input() activePostId: Post['id'] | undefined;
  @Output() setActivePost = new EventEmitter<Post['id']>();

  @ViewChild('postCard') selfElement: ElementRef | undefined;

  isActive: boolean = false;

  ngOnChanges() {
    this.updateActiveStatus();
  }

  ngAfterViewInit() {
    this.setSelfElementHeight();
  }

  get postCardClasses() {
    return classNames('post-card-container', {
      active: this.isActive,
      inactive: !this.isActive,
    });
  }

  updateActiveStatus() {
    this.isActive = this.post?.id === this.activePostId;
  }

  setSelfElementHeight() {
    if (this.selfElement) {
      const width = this.selfElement.nativeElement.offsetWidth;
      const padding = parseInt(getComputedStyle(this.selfElement.nativeElement)['paddingTop']);

      this.selfElement.nativeElement.style.height = `${width - padding * 2}px`;
    }
  }

  onClick() {
    this.setActivePost.emit(this.post?.id);
  }
}
