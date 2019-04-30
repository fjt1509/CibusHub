import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './authentication/guard/auth.guard';

const routes: Routes = [
  {path: 'forums', loadChildren: './forum-posts/forum-posts.module#ForumPostsModule', canActivate: [AuthGuard]},
  {path: '', loadChildren: './home/home.module#HomeModule'},
  {path: 'login', loadChildren: './authentication/auth.module#AuthModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
