import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PostCard } from '../models/Post.model';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class PostCardService {
  constructor(private apiService: ApiService) {}

  fetchPosts(): Observable<PostCard[]> {
    return this.apiService.get<PostCard[]>('posts');
  }
}
