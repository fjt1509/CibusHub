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
import {Injectable} from '@angular/core';
import {AngularFirestoreCollection, DocumentSnapshot} from '@angular/fire/firestore';
import {promise} from 'selenium-webdriver';
import {Post} from './post.model';
import {from, Timestamp} from 'rxjs';
import {Observable} from 'rxjs';
import {pipe} from 'rxjs';
import {map} from 'rxjs/operators';
import {Comment} from './comment.model';
import {ImageMetaData} from '../../files/shared/image-metadata.model';
import {HttpClient} from '@angular/common/http';
import {ofAction} from '@ngxs/store';



describe('ForumPostService', () => {
  let fireStoreMock: any;
  let fileServiceMock: any;
  let httpMock: any;
  let service: ForumPostService;
  let fsCollection: any;

  beforeEach(() => {
    fileServiceMock = jasmine.createSpyObj('FileService', ['getFileUrl', 'upload']);
    fireStoreMock = jasmine.createSpyObj('AngularFireStore', ['collection']);
    fsCollection = jasmine.createSpyObj('collection', ['snapshotChanges', 'doc', 'valueChanges', 'delete']);
    fsCollection.snapshotChanges.and.returnValue(of([]));
    httpMock = jasmine.createSpyObj('HttpClient', ['post', 'put']);
    httpMock.post.and.returnValue(of([]))
    fsCollection.delete.and.returnValue('2');
    fsCollection.doc.and.returnValue('2');
    fsCollection.valueChanges.and.returnValue(of([]));
    fireStoreMock.collection.and.returnValue(fsCollection);




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
        {provide: FileService, useValue: fileServiceMock},
        {provide: HttpClient, useValue: httpMock}
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });


  });
    beforeEach(() => {

      service = TestBed.get(ForumPostService);


    });
  it('should create', () => {
    expect(service).toBeTruthy();
  });
  it('should call Firestore to get forum posts once', () => {
    service.getForumPosts();
    expect(fireStoreMock.collection).toHaveBeenCalledTimes(1);
  });
  it('should call Firestore to get forum post from specific user', () => {
    service.getForumPostsFromUser('2');
    expect(fireStoreMock.collection).toHaveBeenCalledTimes(1);
  });
  it('should call a http request once and to the right url address', () => {
    let helper: Helper;
    const post = new Post();
      service.updatePostNoNewImage(post)
    expect(httpMock.put).toHaveBeenCalledTimes(1);
    expect(httpMock.put).toHaveBeenCalledWith('https://us-central1-cibushub.cloudfunctions.net/Posts', Object({ id: undefined, pictureId: undefined, url: undefined, postName: undefined, postTime: undefined, postDescription: undefined, uId: undefined, userDisplayUrl: undefined, userDisplayName: undefined }) );
  });
});
class Helper {
  postList: Post[] = [];

  getPosts(amount: number): Observable<Post[]> {
    for (let i = 0; i < amount; i++) {
      this.postList.push(
        {id: 'abc' + i, postName: 'item' + i, postDescription: 'abc' + i, postTime: new Date('08.08.08')}
      );
    }
    return of(this.postList);
  }
}


