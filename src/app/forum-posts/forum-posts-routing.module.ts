import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ForumPostListComponent} from './forum-post-list/forum-post-list.component';
import {ForumPostDetailsComponent} from './forum-post-details/forum-post-details.component';
import {ForumPostAddComponent} from './forum-post-add/forum-post-add.component';
import {AuthGuard} from '../authentication/guard/auth.guard';
import {ForumPostMyPostsComponent} from './forum-post-my-posts/forum-post-my-posts.component';
import {ForumPostUpdateComponent} from './forum-post-update/forum-post-update.component';
import {StoreGuard} from './store/guard/store.guard';

const routes: Routes = [
  {path: '', component: ForumPostListComponent, children: [], canActivate: [AuthGuard, StoreGuard]},
  {path: 'add/post', component: ForumPostAddComponent, canActivate: [AuthGuard, StoreGuard]},
  {path: ':id', component: ForumPostDetailsComponent, canActivate: [AuthGuard]},
  {path: 'user/myPosts', component: ForumPostMyPostsComponent, canActivate: [AuthGuard, StoreGuard]},
  {path: 'user/update', component: ForumPostUpdateComponent, canActivate: [AuthGuard, StoreGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumPostsRoutingModule { }
