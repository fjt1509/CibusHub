import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import { ForumPostUpdateComponent } from './forum-post-update.component';
import {CommonModule} from '@angular/common';
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
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxsModule} from '@ngxs/store';
import {PostState} from '../store/post.state';
import {AuthService} from '../../authentication/shared/auth.service';
import {of} from 'rxjs';
import {FileService} from '../../files/shared/file.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ForumPostUpdateComponent', () => {
  let component: ForumPostUpdateComponent;
  let fixture: ComponentFixture<ForumPostUpdateComponent>;
  let httpMock: HttpTestingController;
  let FireAuthMock: any;
  let FireStoreMock: any;
  let FileServiceMock: any;

  beforeEach(async(() => {
    FileServiceMock = jasmine.createSpyObj('FileService', ['getFileUrl']);
    FireAuthMock = jasmine.createSpyObj('AuthService', ['authState'])
    FireStoreMock = jasmine.createSpyObj('AngularFireStore', ['doc', 'valueChanges']);
    FireAuthMock.authState.and.returnValue(of({uid: 'testUser', email: 'blya@kurwa.cyka' }));
    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      declarations: [ForumPostUpdateComponent, ForumPostListComponent, ForumPostAddComponent, ForumPostDetailsComponent, ForumPostMyPostsComponent ],
      imports:[
        CommonModule,
        BrowserAnimationsModule,
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
        AngularFirestoreModule,
        HttpClientTestingModule,
        MzToastModule,
        NgxsModule.forRoot([
          PostState
        ]),
        RouterTestingModule.withRoutes(
          [
            {path: '', component: DummyComponent },
            {path: 'add/post', component: DummyComponent},
            {path: ':id', component: DummyComponent},
            {path: 'user/update', component: DummyComponent}
          ]

        )],
      providers:[
        {provide: AuthService, useValue: FireAuthMock},
        {provide: AngularFirestore, useValue: FireStoreMock},
        {provide: FileService, useValue: FileServiceMock}
        ]
    })

    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumPostUpdateComponent);
    component = fixture.componentInstance;
    httpMock = getTestBed().get(HttpTestingController)



  });

  it('should create', () => {
   expect(component).toBeTruthy();
  });
  it('Should get Current user from Authservice one time on ngOnInit', () => {
    fixture.detectChanges();
    expect(FireAuthMock.authState).toHaveBeenCalledTimes(1);
  });
});


class DummyComponent {

}

