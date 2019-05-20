import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForumPostListComponent } from './forum-post-list.component';
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
  MzSpinnerModule
} from 'ngx-materialize';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FileMetadataModule} from '../../files/file-metadata.module';
import {ImageCropperModule} from 'ngx-image-cropper';
import {ForumPostService} from '../shared/forum-post.service';
import {RouterTestingModule} from '@angular/router/testing';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Post} from '../shared/post.model';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {DOMHelper} from '../../../Test-Helpers/DOMHelper';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {NgxsModule, Store} from '@ngxs/store';
import {PostState} from '../store/post.state';
import {FileService} from '../../files/shared/file.service';
import {AuthService} from '../../authentication/shared/auth.service';
import {AuthGuard} from '../../authentication/guard/auth.guard';
import {ForumPostsModule} from '../forum-posts.module';
import {GetPosts} from '../store/post.action';



describe('ForumPostListComponent', () => {
  let component: ForumPostListComponent;
  let fixture: ComponentFixture<ForumPostListComponent>;
  let dh: DOMHelper<ForumPostListComponent>;
  let postServiceMock: any;
  let FireStoreMock: any;
  let FileServiceMock: any;
  let FireAuthMock: any;

  const post: Post = {
    id: 'idTest',
    comments: null,
    pictureId: 'pictureIdTest',
    postDescription: 'descriptionTest',
    postName: 'postnameTest',
    postTime: new Date(),
    url: 'urlTest'
  };


  beforeEach(async(() => {
    FireStoreMock = jasmine.createSpyObj('AngularFireStore', ['dispatch']);
    FileServiceMock = jasmine.createSpyObj('FileService', ['getFileUrl']);
    FireAuthMock = jasmine.createSpyObj('AuthService', ['authState'])
    postServiceMock = jasmine.createSpyObj('ForumPostService', ['getForumPosts']);
    postServiceMock.getForumPosts.and.returnValue(of([]));
    TestBed.configureTestingModule({

      declarations: [
      ],
      imports: [
        NgxsModule.forRoot([
          PostState
        ]),
        BrowserAnimationsModule,
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
        ForumPostsRoutingModule,
        AngularFireAuthModule,
        AngularFireModule,
        AngularFirestoreModule,
        BrowserDynamicTestingModule,
        ForumPostsModule,
        RouterTestingModule.withRoutes(
          [
            {path: '', component: DummyComponent },
            {path: 'add/post', component: DummyComponent},
            {path: ':id', component: DummyComponent}
          ]

        )

      ],

      providers: [
        {provide: ForumPostService, useValue: postServiceMock},
        {provide: AngularFirestore, useValue: FireStoreMock},
        {provide: FileService, useValue: FileServiceMock},
        {provide: AuthGuard, useValue: FireAuthMock}
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumPostListComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('List Posts', () => {
    let helper: Helper;
    beforeEach(() => {
      helper = new Helper();
      fixture.detectChanges();
    });
    it('Should not show any posts when no post in list', () => {
      postServiceMock.getForumPosts.and.returnValue(helper.getPosts(0));
      const store = TestBed.get(Store) as Store;
      store.dispatch(new GetPosts())
      fixture.detectChanges();
      component.posts.subscribe(posts => {
        expect(posts.length).toBe(0);
      });
    });

    it('Should show one list item when I have one post', () => {
      postServiceMock.getForumPosts.and.returnValue(helper.getPosts(1));
      const store = TestBed.get(Store) as Store;
      store.dispatch(new GetPosts())
      fixture.detectChanges();
      component.posts.subscribe(posts => {
        expect(posts.length).toBe(1);
        expect(posts[0].id).toBe(helper.postList[0].id);
      });
  });
    it('Should show 100 list item when I have 100 posts', () => {
      postServiceMock.getForumPosts.and.returnValue(helper.getPosts(100));
      const store = TestBed.get(Store) as Store;
      store.dispatch(new GetPosts())
      fixture.detectChanges();
      component.posts.subscribe(posts => {
        expect(posts.length).toBe(100);
      });
    });

    // it('Should show date stuff', () => {
    //   const date = new Date(2008, 7, 8);
    //   const stringDate = component.convertDate(date);
    //   expect(stringDate).toBe('Date: 8/8/2008');
    // });
  });
});
  class DummyComponent {
  }

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






