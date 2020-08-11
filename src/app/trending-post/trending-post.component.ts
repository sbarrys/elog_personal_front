import { Component, OnInit } from '@angular/core';
import { PostService } from '../@Service/post.service';
import { Post } from '../@Model/post.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-trending-post',
  templateUrl: './trending-post.component.html',
  styleUrls: ['./trending-post.component.css'],
})
export class TrendingPostComponent implements OnInit {
  posts: Post[];
  result: any;
  keys: any;
  constructor(private postService: PostService, private router: Router) {}
  get() {
    this.postService.getAll().subscribe((result: any) => {
      this.result = result;
      this.keys = Object.keys(result);
    });
  }
  isPicture(picture: string): boolean {
    return picture.length > 1;
  }
  userNameByEmailFunc(email: string) {
    let idx = email.indexOf('@');
    return email.substr(0, idx);
  }
  postDetail(id: number) {
    this.router.navigate([`/postDetail/${id}`]);
  }
  ngOnInit(): void {
    this.get();
  }
}
