import { Injectable, getDebugNode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HIGH_CONTRAST_MODE_ACTIVE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
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
        // 'Access-Control-Allow-Origin': '*',
        access_token: '',
      }),
    };
    httpOptions.headers.set('access_token', 'Bearer ' + access_token);
    console.log(access_token);
    return this.http.get(
      `https://www.googleapis.com/oauth2/v3/userinfo`,
      httpOptions
    );
  }
  saveOrUpdateUser(access_tokenn: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        access_token: access_tokenn,
      }),
    };

    console.log(access_tokenn);

    return this.http.get(this.getUrl('saveOrUpdateUser'), httpOptions);
  }
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
