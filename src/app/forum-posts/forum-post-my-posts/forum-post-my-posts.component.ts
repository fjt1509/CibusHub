import {Component, OnDestroy, OnInit} from '@angular/core';
import {ForumPostService} from '../shared/forum-post.service';
import {Observable, Subscription} from 'rxjs';
import {Post} from '../shared/post.model';
import {AuthService} from '../../authentication/shared/auth.service';
import {User} from '../../authentication/shared/user.model';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';
import {DeletePost, SetSelectedPost} from '../store/post.action';

@Component({
  selector: 'app-forum-post-my-posts',
  templateUrl: './forum-post-my-posts.component.html',
  styleUrls: ['./forum-post-my-posts.component.css'],
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
export class ForumPostMyPostsComponent implements OnInit, OnDestroy {

  postList: Observable<Post[]>;

  user: User;
  sub: Subscription;

  constructor(private postServ: ForumPostService, private authService: AuthService, private router: Router, private store: Store) {
  }

  ngOnInit() {
    this.sub = this.authService.authState().subscribe(user => {
      this.user = user;
      this.postList = this.postServ.getForumPostsFromUser(this.user.uid);
    });

  }

  ngOnDestroy() {
    if (this.sub)
      this.sub.unsubscribe();
  }

  convertDate(postTime: any) {
    const date = new Date(postTime);
    const dateString = date.toLocaleDateString();

    return 'Date: ' + dateString;
  }


  deletePost(id: string) {
    this.store.dispatch(new DeletePost(id));
  }

  goToUpdate(post: Post) {
    if (post.id) {
      this.store.dispatch(new SetSelectedPost(post));
      this.router.navigateByUrl('/forums/user/update');
    }
  }
}
