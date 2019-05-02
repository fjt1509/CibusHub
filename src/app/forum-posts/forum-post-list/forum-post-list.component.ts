import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ForumPostService} from '../shared/forum-post.service';
import {Observable} from 'rxjs';
import {Post} from '../shared/post.model';

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

  postList: Observable<Post[]>;

  constructor(private postService: ForumPostService) { }

  ngOnInit() {
    this.postList = this.postService.getForumPosts();
  }

  convertDate(postTime: any) {
      const date = new Date(postTime);
      const dateString = date.toLocaleDateString();

      return 'Date: ' + dateString;

  }


}
