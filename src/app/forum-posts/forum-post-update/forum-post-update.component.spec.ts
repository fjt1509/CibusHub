import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import { ForumPostUpdateComponent } from './forum-post-update.component';
import {CommonModule} from '@angular/common';
import {ForumPostsRoutingModule} from '../forum-posts-routing.module';
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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FileMetadataModule} from '../../files/file-metadata.module';
import {ImageCropperModule} from 'ngx-image-cropper';
import {ForumPostListComponent} from '../forum-post-list/forum-post-list.component';
import {ForumPostDetailsComponent} from '../forum-post-details/forum-post-details.component';
import {ForumPostAddComponent} from '../forum-post-add/forum-post-add.component';
import {ForumPostMyPostsComponent} from '../forum-post-my-posts/forum-post-my-posts.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, SchemaMetadata} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('ForumPostUpdateComponent', () => {
  let component: ForumPostUpdateComponent;
  let fixture: ComponentFixture<ForumPostUpdateComponent>;
  let httpMock: HttpTestingController;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ForumPostDetailsComponent,
        ForumPostListComponent,
        ForumPostAddComponent,
        ForumPostMyPostsComponent,
        ForumPostUpdateComponent ],
      imports:[
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
        MzToastModule,
        HttpClientTestingModule],
      providers:[
        {provide: AngularFireAuth, useClass: AngularAuthStub},
        {provide: AngularFirestore, useClass: AngularFireStub},
        {provide: AngularFireStorage, useClass: AngularStorageStub}
        ]
    })

    .compileComponents();
  }));
  httpMock = getTestBed().get(HttpTestingController);
  beforeEach(() => {
    fixture = TestBed.createComponent(ForumPostUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
class AngularAuthStub {

}
class AngularFireStub{

}
class AngularStorageStub{

}


