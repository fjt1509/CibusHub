import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import { ForumPostDetailsComponent } from './forum-post-details.component';
import {ForumPostAddComponent} from '../forum-post-add/forum-post-add.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {NgxsModule, Store} from '@ngxs/store';
import {PostState} from '../store/post.state';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {FileService} from '../../files/shared/file.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../../authentication/shared/auth.service';
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
import {ForumPostMyPostsComponent} from '../forum-post-my-posts/forum-post-my-posts.component';
import {ForumPostUpdateComponent} from '../forum-post-update/forum-post-update.component';
import {ForumPostService} from '../shared/forum-post.service';
import {Observable, of} from 'rxjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DOMHelper} from '../../../Test-Helpers/DOMHelper';
import {Post} from '../shared/post.model';
import {timestamp} from 'rxjs/operators';
import {google} from '@google-cloud/firestore/build/protos/firestore_proto_api';
import Timestamp = google.protobuf.Timestamp;
import {Router} from '@angular/router';
import {GetPosts} from '../store/post.action';


describe('ForumPostDetailsComponent', () => {
  let component: ForumPostDetailsComponent;
  let fixture: ComponentFixture<ForumPostDetailsComponent>;
  let FireStoreMock: any;
  let FileServiceMock: any;
  let HttpMock: HttpTestingController;
  let FireAuthMock: any;
  let ForumPostMock: any;
  let dh: DOMHelper<ForumPostDetailsComponent>;
  beforeEach(async(() => {
    ForumPostMock = jasmine.createSpyObj('ForumPostService', ['getForumPostById', 'getForumPostWithComments', 'addComment']);
    ForumPostMock.getForumPostById.and.returnValue(of([{id: 'test', postTime: new Date()}]));
    ForumPostMock.addComment.and.returnValue(of([{postId: '1', comment: 'testComment'}]));
    FireAuthMock = jasmine.createSpyObj('AuthService', ['authState'])
    FireAuthMock.authState.and.returnValue(of({uid: 'testUser', email: 'blya@kurwa.cyka'}));
    FileServiceMock = jasmine.createSpyObj('FileService', ['getFileUrl']);
    FireStoreMock = jasmine.createSpyObj('AngularFireStore', ['dispatch']);
    TestBed.configureTestingModule({

      declarations: [ForumPostDetailsComponent, ForumPostListComponent, ForumPostAddComponent, ForumPostMyPostsComponent, ForumPostUpdateComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      imports: [CommonModule,
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
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MzToastModule,
        NgxsModule.forRoot([
          PostState
        ]),
        AngularFirestoreModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [
            {path: '', component: DummyComponent},
            {path: 'add/post', component: DummyComponent},
            {path: ':id', component: DummyComponent}
          ]
        )
      ],
      providers: [{provide: AngularFirestore, useValue: FireStoreMock},
        {provide: FileService, useValue: FileServiceMock},
        {provide: HttpTestingController, useValue: HttpMock},
        {provide: AuthService, useValue: FireAuthMock},
        {provide: ForumPostService, useValue: ForumPostMock}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    let helper: Helper;
    fixture = TestBed.createComponent(ForumPostDetailsComponent);
    helper = new Helper();
    HttpMock = getTestBed().get(HttpTestingController);
    let location: Location;
    let router: Router;
    dh = new DOMHelper(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });
  it('Should get all comments, users and posts on NgOnInit', () => {
    fixture.detectChanges();
    expect(FireAuthMock.authState).toHaveBeenCalledTimes(1);
    expect(ForumPostMock.getForumPostById).toHaveBeenCalledTimes(1);
    expect(ForumPostMock.getForumPostWithComments).toHaveBeenCalledTimes(1);

  });

  it('should convert time', () => {

  });

  class DummyComponent {

  }

  class Helper {

    postList: Post[] = [];

    getPosts(amount: number): Observable<Post[]> {
      for (let i = 0; i < amount; i++) {
        this.postList.push(
          {id: 'abc' + i, postName: 'item' + i, postDescription: 'abc' + i}
        );
      }
      return of(this.postList);
    }
  }
})
