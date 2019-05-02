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
  MzSpinnerModule
} from 'ngx-materialize';
import { ForumPostAddComponent } from './forum-post-add/forum-post-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FileMetadataModule} from '../files/file-metadata.module';
import {ImageCropperModule} from 'ngx-image-cropper';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [ForumPostDetailsComponent,
  ForumPostListComponent,
  ForumPostAddComponent],
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
  ]
})
export class ForumPostsModule { }
