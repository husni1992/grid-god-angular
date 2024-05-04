import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  isActive: boolean = false;

  ngOnChanges() {
    this.updateActiveStatus();
  }

  updateActiveStatus() {
    this.isActive = this.post?.id === this.activePostId;
  }

  onClick() {
    this.setActivePost.emit(this.post?.id);
  }
}
