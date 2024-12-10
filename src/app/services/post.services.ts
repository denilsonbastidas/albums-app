import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostType } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'https://backvynils-q6yc.onrender.com'; 

  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostType[]> {
    return this.http.get<PostType[]>(`${this.apiUrl}/albums`);
  }

  createPost(post: PostType): Observable<PostType> {
    return this.http.post<PostType>(`${this.apiUrl}/albums`, post);
  }
}
