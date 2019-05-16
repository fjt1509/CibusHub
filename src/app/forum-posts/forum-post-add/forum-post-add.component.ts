import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormControl, FormGroup} from '@angular/forms';
import {ForumPostService} from '../shared/forum-post.service';
import {FileService} from '../../files/shared/file.service';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {ImageMetaData} from '../../files/shared/image-metadata.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../authentication/shared/auth.service';
import {Subscription} from 'rxjs';
import {User} from '../../authentication/shared/user.model';
import {Store} from '@ngxs/store';
import {AddPost} from '../store/post.action';
import {MzToastService} from 'ngx-materialize';
import {Post} from '../shared/post.model';

@Component({
  selector: 'app-forum-post-add',
  templateUrl: './forum-post-add.component.html',
  styleUrls: ['./forum-post-add.component.css'],
  animations: [
    // the fade-in/fade-out animation.
    trigger('simpleFadeAnimation', [

      state('in', style({opacity: 1})),

      transition(':enter', [
        style({opacity: 0}),
        animate(700 )
      ]),
      transition(':leave',
        animate(600, style({opacity: 0})))
    ])
  ]
})
export class ForumPostAddComponent implements OnInit, OnDestroy {

  loading: boolean;

  postForm = new FormGroup( {
    postName: new FormControl(''),
    postDescription: new FormControl('')
  });
  private file: File;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedBlob: Blob;
  currentUser: User;
  sub: Subscription;
  posts: Post;

  constructor(private store: Store, private fileService: FileService, private router: Router, private authServ: AuthService, private toastService: MzToastService) { }

  ngOnInit() {
  this.sub = this.authServ.authState().subscribe(user => {this.currentUser = user; });

  }

  onSubmit() {
    if (this.postForm.value.postName && this.postForm.value.postDescription) {
      const newPost = this.postForm.value;
      newPost.postTime = new Date();
      newPost.uId = this.currentUser.uid;
      newPost.userDisplayUrl = this.currentUser.photoURL;
      newPost.userDisplayName = this.currentUser.displayName;
      this.loading = true;
      this.store.dispatch(new AddPost(newPost, this.getMetaDataForImage())).subscribe(() => {
        this.loading = false;
        this.router.navigateByUrl('forums');
      }, error1 => this.showToast(error1.message));
    } else {
      this.showToast('Please Enter a post name and description');
    }
  }

   getMetaDataForImage(): ImageMetaData {
    if (this.imageChangedEvent && this.imageChangedEvent.target &&
      this.imageChangedEvent.target.files &&
      this.imageChangedEvent.target.files.length > 0) {
      const fileBeforeCrop = this.imageChangedEvent.target.files[0];
      return {
        base64Image: this.croppedImage,
        imageBlob: this.croppedBlob,
        fileMeta: {
          name: fileBeforeCrop.name,
          type: 'image/png',
          size: fileBeforeCrop.size
        }
      };
    } else {
      this.showToast('Please select a photo for your post');
      this.loading = false;
    }
  }

  uploadFile(event) {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedBlob = event.file;
  }
  showToast(message: string) {
    this.toastService.show(message, 7000, 'blue');
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
