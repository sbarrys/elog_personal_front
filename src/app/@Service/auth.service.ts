import { Injectable, getDebugNode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
const BASE_URL = env.SERVER_AUTH_URL;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiService, private http: HttpClient) {}

  getUserInfo(access_token: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        access_token: '',
      }),
    };
    httpOptions.headers.set('access_token', 'Bearer ' + access_token);
    console.log(access_token + '엥');
    return this.http.get(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      httpOptions
    );
  }
  // saveOrUpdateUser(access_token: string): Observable<any> {
  //   return this.http.post(this.getUrl('saveOrUpdateUser'), httpOptions);
  // }
  getUrl(path: string) {
    return `${BASE_URL}/${path}`;
  }
  logout(access_token: string): Observable<any> {
    return this.http.get(
      `https://accounts.google.com/o/oauth2/revoke?token=${access_token}
   `
    );
  }
}
