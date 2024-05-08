import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { PostCard } from '../models/Post.model';

// TODO: make this injectable
const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

@Injectable({
  providedIn: 'root',
})
export class PostCardService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostCard[]> {
    return this.http.get<PostCard[]>(POST_URL);
  }
}
