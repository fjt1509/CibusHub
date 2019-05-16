import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumPostAddComponent } from './forum-post-add.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {NgxsModule, Store} from '@ngxs/store';
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
  MzSpinnerModule, MzToastModule, MzToastService
} from 'ngx-materialize';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FileMetadataModule} from '../../files/file-metadata.module';
import {ImageCropperModule} from 'ngx-image-cropper';
import {ForumPostListComponent} from '../forum-post-list/forum-post-list.component';
import {ForumPostDetailsComponent} from '../forum-post-details/forum-post-details.component';
import {ForumPostMyPostsComponent} from '../forum-post-my-posts/forum-post-my-posts.component';
import {ForumPostUpdateComponent} from '../forum-post-update/forum-post-update.component';
import {DOMHelper} from '../../../Test-Helpers/DOMHelper';
import Toast = Materialize.Toast;
import {Post} from '../shared/post.model';
import {Observable, of} from 'rxjs';
import {User} from '../../authentication/shared/user.model';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GetPosts} from '../store/post.action';
import {Router} from '@angular/router';

describe('ForumPostAddComponent', () => {
  let component: ForumPostAddComponent;
  let fixture: ComponentFixture<ForumPostAddComponent>;
  let FireStoreMock: any;
  let FileServiceMock: any;
  let FireAuthMock: any;
  let ToastMock: any;

  let dh: DOMHelper<ForumPostAddComponent>;
  beforeEach(async(() => {
    FireAuthMock = jasmine.createSpyObj('AuthService', ['authState']);
    FireAuthMock.authState.and.returnValue(of({uid: 'testUser', email: 'blya@kurwa.cyka' }));
    FileServiceMock = jasmine.createSpyObj('FileService', ['getFileUrl']);
    FireStoreMock = jasmine.createSpyObj('AngularFireStore', ['doc', 'valueChanges']);
    ToastMock = jasmine.createSpyObj('MzToastService', ['show']);
    TestBed.configureTestingModule({
declarations: [
  ForumPostAddComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      imports: [CommonModule,
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
        MzToastModule,
        NgxsModule.forRoot([
          PostState
        ]),
        AngularFirestoreModule,
        HttpClientTestingModule,
        RouterTestingModule],

      providers: [{provide: AngularFirestore, useValue: FireStoreMock},
        {provide: FileService, useValue: FileServiceMock},
        {provide: AuthService, useValue: FireAuthMock},
        {provide: MzToastService, useValue: ToastMock}]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumPostAddComponent);
    dh = new DOMHelper(fixture);
    fixture.detectChanges();
    component = fixture.componentInstance;

  });

  describe('Add Posts', () => {
    let helper: Helper;
    let router: Router;
    beforeEach(() => {
      fixture.detectChanges();
      helper = new Helper();
      router = TestBed.get(Router);


    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('Should get Current user from Authservice one time on ngOnInit', () => {
      fixture.detectChanges();
      expect(FireAuthMock.authState).toHaveBeenCalledTimes(1);
    });

    it('Should call onSubmit once when we click Add button', () => {
      spyOn(component, 'onSubmit');
      dh.clickButton('ADD POST');
      fixture.detectChanges();
      expect(component.onSubmit).toHaveBeenCalledTimes(1);
    });

    it('showToast should show one toast with correct message', () => {
      spyOn(component, 'showToast')
      component.showToast('Please select a photo for your post');
      expect(component.showToast).toHaveBeenCalledWith('Please select a photo for your post')

    });

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




