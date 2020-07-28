import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(private location: Location, private router: Router) {}
  goForward() {
    this.location.forward();
  }
  postWrite() {
    this.router.navigateByUrl('/postWrite');
  }
  ngOnInit(): void {}
}
