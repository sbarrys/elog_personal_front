import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Observable } from 'rxjs';

const BASE_URL = env.SERVER_URL;
const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient.get(this.getUrl(path), httpOptions);
  }
  getUrl(path: string) {
    return `${BASE_URL}/${path}`;
  }
}
