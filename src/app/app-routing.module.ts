import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrendingPostComponent } from './trending-post/trending-post.component';
import { RecentPostComponent } from './recent-post/recent-post.component';
import { PostWriteComponent } from './post-write/post-write.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostUpdateComponent } from './post-update/post-update.component';
const routes: Routes = [
  { path: '', component: TrendingPostComponent },
  { path: 'recent', component: RecentPostComponent },
  { path: 'postWrite/:email', component: PostWriteComponent },
  { path: 'postDetail/:id', component: PostDetailComponent },
  { path: 'postUpdate/:id', component: PostUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
