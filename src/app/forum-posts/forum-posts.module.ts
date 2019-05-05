import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumPostsRoutingModule } from './forum-posts-routing.module';
import { ForumPostDetailsComponent } from './forum-post-details/forum-post-details.component';
import {ForumPostListComponent} from './forum-post-list/forum-post-list.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MzButtonModule,
  MzCardModule,
  MzIconMdiModule,
  MzIconModule,
  MzInputModule,
  MzProgressModule,
  MzSpinnerModule, MzToastModule
} from 'ngx-materialize';
import { ForumPostAddComponent } from './forum-post-add/forum-post-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FileMetadataModule} from '../files/file-metadata.module';
import {ImageCropperModule} from 'ngx-image-cropper';
import {HttpClientModule} from '@angular/common/http';
import { ForumPostMyPostsComponent } from './forum-post-my-posts/forum-post-my-posts.component';
import { ForumPostUpdateComponent } from './forum-post-update/forum-post-update.component';

@NgModule({
  declarations: [ForumPostDetailsComponent,
  ForumPostListComponent,
  ForumPostAddComponent,
  ForumPostMyPostsComponent,
  ForumPostUpdateComponent],
  imports: [
    CommonModule,
    ForumPostsRoutingModule,
    FlexLayoutModule,
    MzCardModule,
    MzButtonModule,
    MzIconModule,
    MzIconMdiModule,
    MzInputModule,
    ReactiveFormsModule,
    FormsModule,
    MzSpinnerModule,
    FileMetadataModule,
    ImageCropperModule,
    MzProgressModule,
    MzToastModule
  ]
})
export class ForumPostsModule { }
