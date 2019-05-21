import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import { ForumPostMyPostsComponent } from './forum-post-my-posts.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {FileService} from '../../files/shared/file.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from '../../authentication/shared/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxsModule} from '@ngxs/store';
import {PostState} from '../store/post.state';
import {Observable, of} from 'rxjs';
import {ForumPostService} from '../shared/forum-post.service';
import {DOMHelper} from '../../../Test-Helpers/DOMHelper';
import {ForumPostAddComponent} from '../forum-post-add/forum-post-add.component';
import {Post} from '../shared/post.model';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ForumPostMyPostsComponent', () => {
  let component: ForumPostMyPostsComponent;
  let fixture: ComponentFixture<ForumPostMyPostsComponent>;
  let FireStoreMock: any;
  let FileServiceMock: any;
  let HttpMock: HttpTestingController;
  let FireAuthMock: any;
  let PostServiceMock: any;
  let dh: DOMHelper<ForumPostMyPostsComponent>;

  beforeEach(async(() => {
    FireAuthMock = jasmine.createSpyObj('AuthService', ['authState'])
    FireAuthMock.authState.and.returnValue(of({uid: 'testUser', email: 'blya@kurwa.cyka' }));
    FileServiceMock = jasmine.createSpyObj('FileService', ['getFileUrl']);
    FireStoreMock = jasmine.createSpyObj('AngularFireStore', ['dispatch']);
    PostServiceMock = jasmine.createSpyObj('ForumPostService', ['getForumPostsFromUser'])
    PostServiceMock.getForumPostsFromUser.and.returnValue(of([]));


    TestBed.configureTestingModule({
      declarations: [ ForumPostMyPostsComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers: [{provide: AngularFirestore, useValue: FireStoreMock},
        {provide: FileService, useValue: FileServiceMock},
        {provide: HttpTestingController, useValue: HttpMock},
        {provide: AuthService, useValue: FireAuthMock},
        {provide: ForumPostService, useValue: PostServiceMock}],
      imports: [
        BrowserAnimationsModule,
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

      )],

    })

    .compileComponents();
  }));

  beforeEach(() => {
    dh = new DOMHelper(fixture);
    fixture = TestBed.createComponent(ForumPostMyPostsComponent);
    HttpMock = getTestBed().get(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should call user info and get forum posts one time on NgOnInit', () => {
    fixture.detectChanges();
    expect(FireAuthMock.authState).toHaveBeenCalledTimes(1);
    expect(PostServiceMock.getForumPostsFromUser).toHaveBeenCalledTimes(1);

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


