import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, throwError } from 'rxjs';
import { Post } from '../@Model/post.model';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpProgressEvent,
} from '@angular/common/http';

const BASE_PATH = 'boards';
const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private api: ApiService) {}

  getAll(): Observable<any> {
    return this.api.get(BASE_PATH, httpOptions);
  }
  get(id): Observable<any> {
    return this.api.getById(BASE_PATH + '/' + id);
  }

  postPost(post: Post): Observable<Post> {
    const data = {
      writer: post.writer,
      content: post.content,
      title: post.title,
    };
    return this.api.post(BASE_PATH, data);
  }
}
