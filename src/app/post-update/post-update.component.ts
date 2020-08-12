import { Component, OnInit } from '@angular/core';
import Editor from '@toast-ui/editor';
import { Location } from '@angular/common';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { PostService } from '../@Service/post.service';
import { Post } from '../@Model/post.model';
import { Router, ActivatedRoute } from '@angular/router';
let editor: Editor;
@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css'],
})
export class PostUpdateComponent implements OnInit {
  constructor(
    private location: Location,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  title: any = '';
  post: Post;
  private email: string;
  private id: number;
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
  checknull(): boolean {
    if (this.title == '' || this.email == '') {
      return true;
    } else {
      return false;
    }
  }

  updatePost() {
    if (this.checknull() == true) {
      alert(' 빈칸이 있습니다.');
    } else {
      let post = new Post();
      post.title = this.title; //2. 타이틀 양방향 바인딩 왜안되지
      post.writer = this.email;
      post.content = editor.getMarkdown();
      console.log('123');
      // post.writer= this.  //1. 라우팅 파라미터 가져오는거하기.
      this.postService.updatePost(post, this.id).subscribe((result) => {
        console.log('2222222');

        this.router.navigate([`/`]);
      });
      console.log('2345');
    }
    /* 디비에 등록해주는 절차를 거친다.*/
  }

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    this.postService.get(this.id).subscribe((result) => {
      this.title = result.title;
      this.email = result.user.email;

      this.set();
      editor.setHtml(result.content);
    });
  }
}
