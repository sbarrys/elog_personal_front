import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SelectSortByComponent } from './select-sort-by/select-sort-by.component';
import { TrendingPostComponent } from './trending-post/trending-post.component';
import { RecentPostComponent } from './recent-post/recent-post.component';
import { RouterModule } from '@angular/router';
import { PostWriteComponent } from './post-write/post-write.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SelectSortByComponent,
    TrendingPostComponent,
    RecentPostComponent,
    PostWriteComponent,
  ],
  imports: [
    HttpClientModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    // HttpClientInMemoryWebApiModule 모듈은 HTTP 요청을 가로채고 서버의 응답을 흉내냅니다.
    // 실제 서버가 준비되면 이 부분을 제거하면 됩니다.
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
    //   dataEncapsulation: false,
    // }),
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: TrendingPostComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
