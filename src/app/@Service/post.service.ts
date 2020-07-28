import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, throwError } from 'rxjs';

const BASE_PATH = 'boards';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private api: ApiService) {}

  getAll(): Observable<any> {
    return this.api.get(BASE_PATH);
  }
  get(id): Observable<any> {
    const params: any = {
      id,
    };
    return this.api.get(BASE_PATH, params);
  }
}
