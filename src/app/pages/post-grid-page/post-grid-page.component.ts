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
  isLoading: boolean = true; // TODO: implement MUI progress bar?
  posts: Post[] | undefined;
  activePostId: Post['id'] | undefined;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe((data) => {
      setTimeout(() => {
        this.posts = data;
        this.isLoading = false;
      }, 300);
    });
  }

  setActivePost(postId: Post['id']): void {
    this.activePostId = postId;
  }
}
