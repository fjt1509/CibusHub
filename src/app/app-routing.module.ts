import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'forums', loadChildren: './forum-posts/forum-posts.module#ForumPostsModule'},
  {path: '', loadChildren: './home/home.module#HomeModule'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
