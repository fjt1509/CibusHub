import {getTestBed, TestBed} from '@angular/core/testing';
import { ForumPostService } from './forum-post.service';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {FileService} from '../../files/shared/file.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
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
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {ForumPostListComponent} from '../forum-post-list/forum-post-list.component';
import {ForumPostDetailsComponent} from '../forum-post-details/forum-post-details.component';
import {ForumPostAddComponent} from '../forum-post-add/forum-post-add.component';
import {ForumPostMyPostsComponent} from '../forum-post-my-posts/forum-post-my-posts.component';
import {ForumPostUpdateComponent} from '../forum-post-update/forum-post-update.component';
import any = jasmine.any;
import {of} from 'rxjs';
import {post} from 'selenium-webdriver/http';



describe('ForumPostService', () => {
  let fireStoreMock: any;
  let fileServiceMock: any;
  let httpMock: HttpTestingController;
  let service: ForumPostService;
  let fsCollection: any;

  beforeEach(() => {
    fileServiceMock = jasmine.createSpyObj('FileService', ['getFileUrl', 'upload']);
    fireStoreMock = jasmine.createSpyObj('AngularFireStore', ['collection']);
    fsCollection = jasmine.createSpyObj('collection', ['valueChanges']);
    fireStoreMock.collection.and.returnValue(fsCollection);
    fsCollection.valueChanges.and.returnValue(of([]));



    TestBed.configureTestingModule({
      declarations: [ForumPostDetailsComponent,
        ForumPostListComponent,
        ForumPostAddComponent,
        ForumPostMyPostsComponent,
        ForumPostUpdateComponent],
      imports: [
        AngularFirestoreModule,
        HttpClientTestingModule,
        CommonModule,
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
      ],
      providers: [
        {provide: AngularFirestore, useValue: fireStoreMock},
        {provide: FileService, useValue: fileServiceMock}
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });


  });
  describe('GetForumPostById', () => {
    beforeEach(() => {
      httpMock = getTestBed().get(HttpTestingController);
      service = TestBed.get(ForumPostService);


    });
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
    it('should ...', () => {

    });

  })
})
