import { Component, OnInit } from '@angular/core';
import Editor from '@toast-ui/editor';
import { Location } from '@angular/common';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

let editor: Editor;
@Component({
  selector: 'app-post-write',
  templateUrl: './post-write.component.html',
  styleUrls: ['./post-write.component.css'],
})
export class PostWriteComponent implements OnInit {
  htmlData;

  constructor(private location: Location) {}
  set() {
    editor = new Editor({
      el: document.querySelector('#editor'),
      height: '500px',
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      plugins: [colorSyntax],
    });
  }
  postPost() {
    /* 디비에 등록해주는 절차를 거친다.*/
    this.htmlData = editor.getHtml();
    console.log(editor.getHtml());
    document
      .querySelector('#viewer')
      .insertAdjacentHTML('beforeend', this.htmlData); //이것을 통해 본다면 그냥 getHtml 해서 db에 저장하면 출력이 잘안될것... toast 용 viewr 가 잇을텐데..
  }

  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.set();
  }
}
