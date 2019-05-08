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

describe('ForumPostMyPostsComponent', () => {
  let component: ForumPostMyPostsComponent;
  let fixture: ComponentFixture<ForumPostMyPostsComponent>;
  let FireStoreMock: any;
  let FileServiceMock: any;
  let HttpMock: HttpTestingController;
  let FireAuthMock: any;
  let StoreMock: any;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ ForumPostMyPostsComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      providers:[{provide: AngularFirestore, useValue: FireStoreMock},
        {provide: FileService, useValue: FileServiceMock},
        {provide: HttpTestingController, useValue: HttpMock},
        {provide: AuthService, useValue: FireAuthMock}],
      imports:[
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
    FileServiceMock = jasmine.createSpyObj('FileService',['getFileUrl']);
    FireStoreMock = jasmine.createSpyObj('AngularFireStore',['dispatch']);
    FireAuthMock = jasmine.createSpyObj('AuthService',['googleSignin','updateUserData'])
    StoreMock = jasmine.createSpyObj('post.action',['GetPosts','AddPost'])
    fixture = TestBed.createComponent(ForumPostMyPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    HttpMock = getTestBed().get(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
class DummyComponent {

}
