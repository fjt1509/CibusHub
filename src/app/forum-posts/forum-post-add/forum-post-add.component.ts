import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormControl, FormGroup} from '@angular/forms';
import {ForumPostService} from '../shared/forum-post.service';
import {FileService} from '../../files/shared/file.service';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {ImageMetaData} from '../../files/shared/image-metadata.model';

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
export class ForumPostAddComponent implements OnInit {

  postForm = new FormGroup( {
    postName: new FormControl(''),
    postDescription: new FormControl('')
  });
  private file: File;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedBlob: Blob;

  constructor(private postService: ForumPostService, private fileService: FileService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
  }

  onSubmit() {
    const newPost = this.postForm.value;
    newPost.postTime = new Date();

    this.postService.addPostWithImage(
      newPost,
      this.getMetaDataForImage()
    ).subscribe(postImage => {
      this.router.navigateByUrl('/forums');
    });
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
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    // Preview
    this.croppedImage = event.base64;
    this.croppedBlob = event.file;
  }
}
