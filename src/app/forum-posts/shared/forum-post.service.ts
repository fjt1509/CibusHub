import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {promise} from 'selenium-webdriver';
import {Post} from './post.model';
import {from} from 'rxjs';
import {Observable} from 'rxjs';
import {pipe} from 'rxjs';
import {map} from 'rxjs/operators';
import {Comment} from './comment.model';
import {ImageMetaData} from '../../files/shared/image-metadata.model';
import {FileService} from '../../files/shared/file.service';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForumPostService {

  forumPostCollection: AngularFirestoreCollection<Post>;
  commentCollection: AngularFirestoreCollection<Comment>;
  forumPosts: Observable<Post[]>;

  constructor(private db: AngularFirestore, private fileService: FileService) { }


  getForumPosts(): Observable<Post[]> {
    this.forumPostCollection = this.db.collection<Post>('post', ref => ref.orderBy('postTime', 'desc'));
    return this.forumPosts = this.forumPostCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( action => {
        const data = action.payload.doc.data() as Post;
        const id = action.payload.doc.id;
        return{id, ...data};
      });
    }));

  }

  addForumPost(post: Post): Observable<Post> {
    this.forumPostCollection = this.db.collection<Post>('post');
    return from( this.forumPostCollection.add(post)).pipe(map(postRef => { post.id = postRef.id; return post; }));
  }


  getForumPostById(postId: string): Observable<any> {
    return this.db.collection<Post>('post').doc(postId).valueChanges();
  }

  addComment(postId: string, comment: string, time: Date): Promise<any> {
    this.commentCollection = this.db.collection<Post>('post').doc(postId).collection<Comment>('comments');
    return this.commentCollection.add({comment, time});
  }

  getForumPostWithComments(id: string): Observable<any[]> {
    return this.db.collection<Post>('post').doc(id).collection('comments', ref => ref.orderBy('time', 'desc')).valueChanges();
  }

  addPostWithImage(post: Post, imageMeta: ImageMetaData): Observable<Post> {

    if (imageMeta && imageMeta.fileMeta
      && imageMeta.fileMeta.name && imageMeta.fileMeta.type &&
      (imageMeta.imageBlob || imageMeta.base64Image)) {
      return this.fileService.uploadImage(imageMeta).pipe(switchMap( metadata => {
        post.pictureId = metadata.id;
        return this.addForumPost(post);
      }));
    }

  }
}
