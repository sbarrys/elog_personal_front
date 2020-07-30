import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../@Service/auth.service';
import { Observable } from 'rxjs';
import { stringify, parse } from 'qs';
const CLIENT_ID =
  '448516851590-qda48s4prk42bi65a3p1bgl86km2sl9s.apps.googleusercontent.com';
const AUTHORIZE_URI = 'https://accounts.google.com/o/oauth2/v2/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  loggedin: boolean = false;
  ////////////////
  queryStr;
  loginUrl;
  initQueryStr() {
    this.queryStr = stringify({
      response_type: 'token',
      client_id: CLIENT_ID,
      redirect_uri: window.location.href,
      scope: 'https://www.googleapis.com/auth/contacts.readonly',
    });
    this.loginUrl = AUTHORIZE_URI + '?' + this.queryStr;
  }
  ////////////////
  initLoggedin() {
    if (window.sessionStorage.getItem('access_token')) {
      this.loggedin = true;
    } else {
      this.loggedin = false;
    }
  }
  constructor(
    private location: Location,
    private router: Router,
    private authService: AuthService
  ) {}
  goForward() {
    this.location.forward();
  }
  postWrite() {
    this.router.navigateByUrl('/postWrite');
  }

  logOut() {
    window.sessionStorage.removeItem('access_token');
    this.loggedin = false;
    window.location.hash = '';
    window.location.reload;
    ////////////////
    this.initQueryStr();
    ////////////////
  }

  ngOnInit(): void {
    this.initQueryStr();
    this.initLoggedin();
    const { access_token } = parse(window.location.hash.substr(1));
    if (window.location.hash.substr(1).length > 5) {
      window.sessionStorage.setItem(
        'access_token',
        window.location.hash.substr(1)
      );
      this.loggedin = true;
      window.location.hash = '';
    }
  }
}

// 프론트엔드에서  게시글 등 들어갈떄 accesstoken 없다면 아래처럼 로그인으로 연결시켜주자.
// if (!access_token) {
//   window.location.assign(loginUrl);
//   return null;
