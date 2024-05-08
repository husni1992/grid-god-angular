import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostCard } from '../models/Post.model';
import { HttpClient } from '@angular/common/http';

// TODO: make this injectable
const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

// This class is injectable and singleton
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostCard[]> {
    return this.http.get<PostCard[]>(POST_URL);
  }
}
