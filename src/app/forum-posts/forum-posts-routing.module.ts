import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ForumPostListComponent} from './forum-post-list/forum-post-list.component';
import {ForumPostDetailsComponent} from './forum-post-details/forum-post-details.component';
import {ForumPostAddComponent} from './forum-post-add/forum-post-add.component';
import {AuthGuard} from '../authentication/guard/auth.guard';

const routes: Routes = [
  {path: '', component: ForumPostListComponent, children: [], canActivate: [AuthGuard]},
  {path: 'add/post', component: ForumPostAddComponent, canActivate: [AuthGuard]},
  {path: ':id', component: ForumPostDetailsComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumPostsRoutingModule { }
