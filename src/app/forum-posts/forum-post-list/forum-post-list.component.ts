import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ForumPostService} from '../shared/forum-post.service';
import {Observable} from 'rxjs';
import {Post} from '../shared/post.model';
import {Select, Store} from '@ngxs/store';
import {PostState} from '../store/post.state';
import {GetPosts} from '../store/post.action';

@Component({
  selector: 'app-forum-post-list',
  templateUrl: './forum-post-list.component.html',
  styleUrls: ['./forum-post-list.component.css'],
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
export class ForumPostListComponent implements OnInit {
  @Select(PostState.getPostList) posts: Observable<Post[]>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetPosts());
  }

  // convertDate(postTime: any) {
  //   console.log(postTime);
  //   // const date = new Date(postTime.nanos);
  //   // console.log(date);
  //
  //   const date = postTime.toDate();
  //   const dateString = date.toLocaleDateString();
  //   return 'Date: ' + dateString;
  // }
}
