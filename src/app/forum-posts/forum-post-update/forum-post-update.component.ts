import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {User} from '../../authentication/shared/user.model';
import {Observable, Subscription} from 'rxjs';
import {ForumPostService} from '../shared/forum-post.service';
import {FileService} from '../../files/shared/file.service';
import {Router} from '@angular/router';
import {AuthService} from '../../authentication/shared/auth.service';
import {ImageMetaData} from '../../files/shared/image-metadata.model';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {tap} from 'rxjs/operators';
import {Post} from '../shared/post.model';
import {MzToastService} from 'ngx-materialize';
import {Select, Store} from '@ngxs/store';
import {SetSelectedPost, UpdatePost, UpdatePostIncPic} from '../store/post.action';
import {PostState} from '../store/post.state';

@Component({
  selector: 'app-forum-post-update',
  templateUrl: './forum-post-update.component.html',
  styleUrls: ['./forum-post-update.component.css'],
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
export class ForumPostUpdateComponent implements OnInit, OnDestroy {


  post: Observable<Post>;


  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedBlob: Blob;

  currentUser: User;
  sub: Subscription;

  newImageSelected: boolean;
  imageLoad: boolean;

  loading: boolean;
  constructor(private fileService: FileService, private router: Router, private authServ: AuthService, private toastService: MzToastService, private store: Store) {
  }

  ngOnInit() {
    this.sub = this.authServ.authState().subscribe(user => {this.currentUser = user; });
    this.post = this.store.select( PostState.getSelectedPost).pipe(tap(postRef => {
      if (postRef) {
        this.imageLoad = true;
        this.fileService.getFileUrl(postRef.pictureId).subscribe( url => {postRef.url = url; this.imageLoad = false; });
      }
      else {
        this.router.navigateByUrl('/forums');
      }
    }));
  }


  updateImage(postInfo: Post) {
    console.log(postInfo);
    if (this.imageChangedEvent) {
      this.loading = true;
      this.store.dispatch(new UpdatePostIncPic(postInfo, this.getMetaDataForImage())).subscribe(() => this.router.navigateByUrl(''), error1 => {this.showToast('Failed to update the Post'); this.loading = false; });
    } else {
      this.loading = true;
      this.store.dispatch(new UpdatePost(postInfo)).subscribe(() => this.router.navigateByUrl(''), error1 => {this.showToast('Failed to update the Post'); this.loading = false; });
    }
  }


  private getMetaDataForImage(): ImageMetaData {
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
    }
    return undefined;
  }

  uploadFile(event) {
    this.newImageSelected = true;
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedBlob = event.file;
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.store.dispatch(new SetSelectedPost(null));
  }

  resetImage() {
    this.imageChangedEvent = null;
    this.newImageSelected = false;
  }

  showToast(message: string) {
    this.toastService.show(message, 7000, 'red');
  }

}
