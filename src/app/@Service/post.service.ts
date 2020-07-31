import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, throwError } from 'rxjs';
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
    const params: any = {
      id,
    };
    return this.api.get(BASE_PATH, params);
  }
}
