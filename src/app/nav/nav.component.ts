import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../@Service/auth.service';
import { stringify } from 'qs';
const CLIENT_ID =
  '448516851590-qda48s4prk42bi65a3p1bgl86km2sl9s.apps.googleusercontent.com';
const AUTHORIZE_URI = 'https://accounts.google.com/o/oauth2/v2/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    private location: Location,
    private router: Router,
    private authService: AuthService
  ) {}
  private userEmail: string;
  private access_token: string;
  loggedin: boolean = false;
  private userInfo: any;
  // 로그인 구현 //
  queryStr: string;
  loginUrl: string;

  initQueryStr() {
    this.queryStr = stringify({
      response_type: 'token',
      client_id: CLIENT_ID,
      redirect_uri: window.location.href,
      scope:
        'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email ',
    });
    this.loginUrl = AUTHORIZE_URI + '?' + this.queryStr;
  }

  initLoggedin() {
    if (window.sessionStorage.getItem('access_token')) {
      this.loggedin = true;
      this.saveOrUpdateUser(window.sessionStorage.getItem('access_token'));
    } else {
      this.loggedin = false;
    }
  }

  saveOrUpdateUser(access_token: string) {
    this.authService.saveOrUpdateUser(access_token).subscribe(
      (result) => {
        this.userInfo = result;
        this.loggedin = true;
      },
      (err) => {
        this.logOut();
      }
    );
  }

  userNameByEmailFunc(email: string) {
    let idx = email.indexOf('@');
    return email.substr(0, idx);
  }
  goForward() {
    this.location.forward();
  }
  postWrite() {
    this.router.navigate([`/postWrite/${this.userInfo.email}`]);
  }

  logOut() {
    this.authService.logout(window.sessionStorage.getItem('access_token'));
    window.sessionStorage.removeItem('access_token');
    this.loggedin = false;
    this.initQueryStr();
  }

  ngOnInit(): void {
    this.initQueryStr();
    if (window.location.hash.substr(1).length > 5) {
      let start: number = window.location.hash.indexOf('=');
      let end: number = window.location.hash.indexOf('&t');
      this.access_token = window.location.hash.substr(
        start + 1,
        end - start - 1
      );

      window.sessionStorage.setItem('access_token', this.access_token);
      window.location.hash = '';
    }
    this.initLoggedin();
  }

  ngOnDestory(): void {
    window.sessionStorage.clear();
  }
}
