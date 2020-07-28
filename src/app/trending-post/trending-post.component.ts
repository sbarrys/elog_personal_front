import { Component, OnInit } from '@angular/core';
import { PostService } from '../@Service/post.service';
import { Post } from '../@Model/post.model';
import { from } from 'rxjs';
@Component({
  selector: 'app-trending-post',
  templateUrl: './trending-post.component.html',
  styleUrls: ['./trending-post.component.css'],
})
export class TrendingPostComponent implements OnInit {
  posts: Post[];
  result: any;
  keys: any;
  constructor(private postService: PostService) {}
  get() {
    this.postService.getAll().subscribe((result: any) => {
      this.result = result;
      this.keys = Object.keys(result);
      console.log(result[1]);
    });
  }

  ngOnInit(): void {
    this.get();
  }
}
