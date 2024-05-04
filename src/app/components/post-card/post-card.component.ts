import { Component, Input } from '@angular/core';
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
}
