import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/Post.model';
import { PostCardComponent } from '../../components/post-card/post-card.component';

@Component({
  selector: 'app-post-grid-page',
  standalone: true,
  imports: [PostCardComponent],
  templateUrl: './post-grid-page.component.html',
  styleUrl: './post-grid-page.component.scss',
})
export class PostGridPageComponent {
  posts: Post[] | undefined;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }
}
