import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumPostDetailsComponent } from './forum-post-details.component';
import {ForumPostAddComponent} from '../forum-post-add/forum-post-add.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {NgxsModule} from '@ngxs/store';
import {PostState} from '../store/post.state';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {FileService} from '../../files/shared/file.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
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
import {Comment} from '../shared/comment.model';

describe('ForumPostDetailsComponent', () => {
  let component: ForumPostDetailsComponent;
  let fixture: ComponentFixture<ForumPostDetailsComponent>;
  let FireStoreMock: any;
  let FileServiceMock: any;
  let FireAuthMock: any;
  let ForumPostMock: any;
  let dh: DOMHelper<ForumPostDetailsComponent>;
  beforeEach(async(() => {
    ForumPostMock = jasmine.createSpyObj('ForumPostService', ['getForumPostById', 'getForumPostWithComments', 'addComment']);
    ForumPostMock.getForumPostById.and.returnValue(of([]));
    ForumPostMock.addComment.and.returnValue(of([{postId: '1', comment: ''}]));
    FireAuthMock = jasmine.createSpyObj('AuthService', ['authState'])
    FireAuthMock.authState.and.returnValue(of({uid: 'testUser', email: 'blya@kurwa.cyka' }));
    FileServiceMock = jasmine.createSpyObj('FileService', ['getFileUrl']);
    FireStoreMock = jasmine.createSpyObj('AngularFireStore', ['dispatch']);
    TestBed.configureTestingModule({

      declarations: [ ForumPostDetailsComponent, ForumPostListComponent, ForumPostAddComponent, ForumPostMyPostsComponent, ForumPostUpdateComponent ],
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
            {path: '', component: DummyComponent },
            {path: 'add/post', component: DummyComponent},
            {path: ':id', component: DummyComponent}
          ]

        )
      ],
      providers: [{provide: AngularFirestore, useValue: FireStoreMock},
        {provide: FileService, useValue: FileServiceMock},
        {provide: AuthService, useValue: FireAuthMock},
        {provide: ForumPostService, useValue: ForumPostMock}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let helper: Helper;
    fixture = TestBed.createComponent(ForumPostDetailsComponent);
    helper = new Helper();
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
  it('Should convert post date', () => {
    const date = component.convertPostDate('08-08-08');
    expect(date).toBe('Date: 8.8.2008');
  });


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
