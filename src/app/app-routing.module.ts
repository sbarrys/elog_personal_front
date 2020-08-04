import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrendingPostComponent } from './trending-post/trending-post.component';
import { RecentPostComponent } from './recent-post/recent-post.component';
import { PostWriteComponent } from './post-write/post-write.component';

const routes: Routes = [
  { path: '', component: TrendingPostComponent },
  { path: 'recent', component: RecentPostComponent },
  { path: 'postWrite/:userinfo', component: PostWriteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
