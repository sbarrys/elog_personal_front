import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-sort-by',
  templateUrl: './select-sort-by.component.html',
  styleUrls: ['./select-sort-by.component.css'],
})
export class SelectSortByComponent implements OnInit {
  constructor(private router: Router) {}
  select_sort: boolean = true; //if 1: trending 2:recent
  nowuri: string = this.router.url;
  btnClick_trending = function () {
    this.router.navigateByUrl('/');
  };
  btnClick_recent = function () {
    this.router.navigateByUrl('/recent');
  };
  ngOnInit(): void {}
}
