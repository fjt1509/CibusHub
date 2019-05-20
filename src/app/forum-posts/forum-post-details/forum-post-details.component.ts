import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {ForumPostService} from '../shared/forum-post.service';
import {Post} from '../shared/post.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FormControl, FormGroup} from '@angular/forms';
import {tap} from 'rxjs/operators';
import {FileService} from '../../files/shared/file.service';
import {User} from '../../authentication/shared/user.model';
import {AuthService} from '../../authentication/shared/auth.service';

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

  errorMessage: string;
  currentUser: User;
  sub: Subscription;


  constructor(private router: Router, private postService: ForumPostService, private fileService: FileService, private authServ: AuthService) { }

  ngOnInit() {
    const uri = this.router.url;
    this.postId = uri.substr(uri.lastIndexOf('/') + 1);

    this.post = this.postService.getForumPostById(this.postId).pipe(tap(postRef => {
      if (postRef.pictureId) {
        this.imageLoad = true;
        this.fileService.getFileUrl(postRef.pictureId).subscribe( url => {postRef.url = url; this.imageLoad = false; }, error1 => this.errorMessage = error1 );
      }
    }));


    this.comments = this.postService.getForumPostWithComments(this.postId);

    this.sub = this.authServ.authState().subscribe(user => {this.currentUser = user; });

    this.createComment = false;

  }

  convertPostDate(postTime: any) {
    const date = postTime.toDate();
    const dateString = date.toLocaleDateString();
    return 'Date: ' + dateString;
  }

  convertCommentDate(postTime: any) {
    console.log(postTime);

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
    comment.uId = this.currentUser.uid;
    comment.userDisplayUrl = this.currentUser.photoURL;
    comment.userDisplayName = this.currentUser.displayName;
    comment.time = new Date();

    this.postService.addComment(this.postId, comment).then( () => {this.createComment = false; this.commentForm.reset(); });
  }
}
