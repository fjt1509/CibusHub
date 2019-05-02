import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ForumPostService} from '../shared/forum-post.service';
import {Post} from '../shared/post.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormControl, FormGroup} from '@angular/forms';
import {tap} from 'rxjs/operators';
import {FileService} from '../../files/shared/file.service';

@Component({
  selector: 'app-forum-post-details',
  templateUrl: './forum-post-details.component.html',
  styleUrls: ['./forum-post-details.component.css'],
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
export class ForumPostDetailsComponent implements OnInit {

  postId: string;
  post: Observable<any>;
  comments: Observable<any[]>;
  commentForm = new FormGroup( {
    comment: new FormControl('')
  });
  createComment: boolean;
  imageLoad: boolean;

  constructor(private router: Router, private postService: ForumPostService, private fileService: FileService) { }

  ngOnInit() {
    const uri = this.router.url;
    this.postId = uri.substr(uri.lastIndexOf('/') + 1);

    this.post = this.postService.getForumPostById(this.postId).pipe(tap(postRef => {
      if (postRef.pictureId) {
        this.imageLoad = true;
        this.fileService.getFileUrl(postRef.pictureId).subscribe( url => {postRef.url = url; this.imageLoad = false; });
      }
      console.log(postRef);
    }));


    this.comments = this.postService.getForumPostWithComments(this.postId);
    this.createComment = false;

  }

  convertPostDate(postTime: any) {
    const date = new Date(postTime);
    const dateString = date.toLocaleDateString();

    return 'Date: ' + dateString;

  }

  convertCommentDate(postTime: any) {
    const date = postTime.toDate();
    const dateString = date.toLocaleDateString();

    return 'Date: ' + dateString;

  }

  convertTime(time: any) {
    const date = time.toDate();
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();

    return 'Time: ' + hours + ':' + minutes.substr(-2);
  }

  onSubmit() {
    const date = new Date();
    const comment = this.commentForm.value;

    this.postService.addComment(this.postId, comment.comment, date).then( () => {this.createComment = false; this.commentForm.reset(); });
  }
}
