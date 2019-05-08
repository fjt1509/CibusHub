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
import {ForumPostAddComponent} from '../forum-post-add/forum-post-add.component';
import {ForumPostDetailsComponent} from '../forum-post-details/forum-post-details.component';
import {ForumPostService} from '../shared/forum-post.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable, of} from 'rxjs';
import {Post} from '../shared/post.model';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ForumPostMyPostsComponent} from '../forum-post-my-posts/forum-post-my-posts.component';
import {ForumPostUpdateComponent} from '../forum-post-update/forum-post-update.component';
import {By} from '@angular/platform-browser';
import {Location} from '@angular/common';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {DOMHelper} from '../../../Test-Helpers/DOMHelper';
import {AngularFirestore} from '@angular/fire/firestore';
import {NgxsModule} from '@ngxs/store';
import {PostState} from '../store/post.state';



describe('ForumPostListComponent', () => {
  let component: ForumPostListComponent;
  let fixture: ComponentFixture<ForumPostListComponent>;
  let dh: DOMHelper;
  const post: Post = {
    id: 'idTest',
    comments: null,
    pictureId: 'pictureIdTest',
    postDescription: 'descriptionTest',
    postName: 'postnameTest',
    postTime: new Date(),
    url: 'urlTest'};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        BrowserDynamicTestingModule,
        RouterTestingModule.withRoutes(
          [
            {path: '', component: DummyComponent },
            {path: 'add/post', component: DummyComponent},
            {path: ':id', component: DummyComponent}
          ]

        )

      ],
      declarations: [
        ForumPostListComponent,
        ForumPostAddComponent,
        ForumPostDetailsComponent,
        ForumPostMyPostsComponent,
        ForumPostUpdateComponent ],
      providers: [{provide: ForumPostService, useClass: ForumPostServiceStub},
        {provide: AngularFireAuth, useClass: AngularAuthStub},
        {provide: AngularFirestore, useClass: AngularFireStub}]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dh = new DOMHelper(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Should contain a add post button on the page', () => {
    const linkDev = fixture.debugElement.queryAll(By.css('Button'));
    const addPostBtn: HTMLButtonElement = linkDev[0].nativeElement;
    expect(addPostBtn).toBeTruthy();
  });

  it('Should contain a home post button on the page', () => {
    const linkDev = fixture.debugElement.queryAll(By.css('Button'));
    const homePostBtn: HTMLButtonElement = linkDev[1].nativeElement;
    expect(homePostBtn).toBeTruthy();
  });

  it('Should navitage to / when home button is pressed', () => {
    const location = TestBed.get(Location);
    const linkDev = fixture.debugElement.queryAll(By.css('Button'));
    const navigationButton: HTMLButtonElement = linkDev[1].nativeElement;
    navigationButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => expect(location.path('')).toBe('/'));
  });


/*
  it('Should not show any posts when no post in list', () => {
    expect(dh.count('mz-card')).toBe(1);
  });
 */
/*
  it('Should show 1 post when there is 1 post in list', () => {
    component.postList = of([post]);
    fixture.detectChanges();
    const cardItems = fixture.debugElement.queryAll(By.css('mz-card'));
    console.log(cardItems);
  });
 */

});

class ForumPostServiceStub {
  getForumPosts(): Observable<Post[]> {
    return of([]);
  }}
class AngularAuthStub {

}
class AngularFireStub {

}
class DummyComponent {

}


