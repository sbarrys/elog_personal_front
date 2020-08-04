import { Component, OnInit } from '@angular/core';
import Editor from '@toast-ui/editor';
import { Location } from '@angular/common';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { PostService } from '../@Service/post.service';
import { Post } from '../@Model/post.model';
import { ActivatedRoute } from '@angular/router';

let editor: Editor;
@Component({
  selector: 'app-post-write',
  templateUrl: './post-write.component.html',
  styleUrls: ['./post-write.component.css'],
})
export class PostWriteComponent implements OnInit {
  constructor(
    private location: Location,
    private postService: PostService,
    private route: ActivatedRoute
  ) {}
  title: string;
  private email: string;
  set() {
    editor = new Editor({
      el: document.querySelector('#editor'),
      height: '500px',
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      plugins: [colorSyntax],
      placeholder: 'Please enter text.',
    });
  }

  postPost() {
    let post = new Post();
    post.title = this.title; //2. 타이틀 양방향 바인딩 왜안되지
    post.writer = this.email;
    post.content = editor.getMarkdown();
    console.log(post);

    // post.writer= this.  //1. 라우팅 파라미터 가져오는거하기.
    this.postService.postPost(post);
    /* 디비에 등록해주는 절차를 거친다.*/
  }

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.set();
    const params = this.route.snapshot.params;
    this.email = params.email;
  }
}
