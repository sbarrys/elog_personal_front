import { Component, OnInit, Input } from '@angular/core';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
import { PostService } from '../@Service/post.service';
import { Post } from '../@Model/post.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

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
    private location: Location,
    private router: Router,
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
  isWriter(): boolean {
    return this.post.writer == window.sessionStorage.getItem('email');
  }
  userNameByEmailFunc(email: string) {
    let idx = email.indexOf('@');
    return email.substr(0, idx);
  }
  goBack() {
    this.location.back();
  }

  set() {
    viewer = new Viewer({
      el: document.querySelector('#viewer'),
      initialValue: this.post.content,
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.get(this.id);
    this.isWriter();
  }
  postDelete(id: number) {
    this.postService
      .postDelete(id)
      .subscribe((ok) => this.router.navigate([`/`]));
  }
}
