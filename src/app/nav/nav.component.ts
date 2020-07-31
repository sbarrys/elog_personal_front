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
  constructor(
    private location: Location,
    private router: Router,
    private authService: AuthService
  ) {}
  access_token: string;
  loggedin: boolean = false;
  userInfo: any;
  // 로그인 구현 //
  queryStr: string;
  loginUrl: string;
  initQueryStr() {
    this.queryStr = stringify({
      response_type: 'token',
      client_id: CLIENT_ID,
      redirect_uri: window.location.href,
      scope: 'https://www.googleapis.com/auth/userinfo.profile',
    });
    this.loginUrl = AUTHORIZE_URI + '?' + this.queryStr;
  }

  initLoggedin() {
    if (window.sessionStorage.getItem('access_token')) {
      this.loggedin = true;
      this.getUserInfo(window.sessionStorage.getItem('access_token'));
    } else {
      this.loggedin = false;
    }
  }

  //로그인 상태일때 유저정보 받아서 데이터에 담아놓기. (화면과 바인딩시킬예정)
  getUserInfo(access_token: string) {
    this.authService.getUserInfo(access_token).subscribe((result) => {
      this.userInfo = result.data;
      console.log(result.user_id); //백엔드에 access_token보내면 백엔드는 sns 로부터 유저정보를 받고 DB에 저장하고 프론트로 보내줄것이다.
    });

    ////////
  }

  goForward() {
    this.location.forward();
  }
  postWrite() {
    this.router.navigateByUrl('/postWrite');
  }
  // accesstoken무효화 / 세션비우기 /
  logOut() {
    this.authService.logout(window.sessionStorage.getItem('access_token'));
    window.sessionStorage.removeItem('access_token');
    this.loggedin = false;
    this.initQueryStr();
  }
  ngOnDestory(): void {
    window.sessionStorage.clear();
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
      this.loggedin = true;
      window.location.hash = '';
    }
    this.initLoggedin();
  }
}

// 프론트엔드에서  게시글 등 들어갈떄 accesstoken 없다면 아래처럼 로그인으로 연결시켜주자.
// if (!access_token) {
//   window.location.assign(loginUrl);
//   return null;
