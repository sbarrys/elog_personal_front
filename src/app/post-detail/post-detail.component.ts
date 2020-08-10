import { Component, OnInit } from '@angular/core';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import { PostService } from '../@Service/post.service';
import { Post } from '../@Model/post.model';
import { ActivatedRoute } from '@angular/router';

let viewer: Viewer;

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post: Post;
  private id: number;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}
  get(id: number) {
    this.postService.get(id).subscribe((result: any) => {
      this.post = result;
      this.post.writer = result.user.email;
      this.set();
    });
  }
  getPost() {
    return this.post;
  }
  set() {
    viewer = new Viewer({
      el: document.querySelector('#viewer'),
      initialValue: this.post.content,
    });
    console.log(this.post);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.get(this.id);
  }
}
