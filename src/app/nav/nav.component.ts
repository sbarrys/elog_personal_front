import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../@Service/auth.service';
import { Observable } from 'rxjs';
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
  goForward() {
    this.location.forward();
  }
  postWrite() {
    this.router.navigateByUrl('/postWrite');
  }

  login() {
    return this.authService.login('auth/home').subscribe((result: any) => {
      window.location.href = result;
    });
  }

  ngOnInit(): void {}
}
