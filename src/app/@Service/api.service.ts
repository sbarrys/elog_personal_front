import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpProgressEvent,
} from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Observable } from 'rxjs';

const BASE_URL = env.SERVER_API_URL;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get(path: string, httpOptions: any): Observable<any> {
    return this.httpClient.get(this.getUrl(path), httpOptions);
  }
  getUrl(path: string) {
    return `${BASE_URL}/${path}`;
  }
}
