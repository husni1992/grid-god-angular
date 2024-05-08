import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { PostCard } from '../models/Post.model';

@Component({
  selector: 'app-post-grid-page',
  templateUrl: './post-grid-page.component.html',
  styleUrl: './post-grid-page.component.scss',
})
export class PostGridPageComponent {
  isLoading: boolean = true;
  posts: PostCard[] | undefined;
  activePostId: PostCard['id'] | undefined;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
      this.isLoading = false;
    });
  }

  setActivePost(postId: PostCard['id']): void {
    this.activePostId = postId;
  }
}
