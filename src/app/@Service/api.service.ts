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
  constructor(private http: HttpClient) {}

  get(path: string, httpOptions: any): Observable<any> {
    return this.http.get(this.getUrl(path), httpOptions);
  }
  getById(path: string): Observable<any> {
    return this.http.get(this.getUrl(path));
  }
  getUrl(path: string) {
    return `${BASE_URL}/${path}`;
  }
  post(path: string, params: any): Observable<any> {
    const config = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    return this.http.post(this.getUrl(path), params, config);
  }
}
