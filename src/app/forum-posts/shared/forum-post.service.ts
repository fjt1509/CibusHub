import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentSnapshot} from '@angular/fire/firestore';
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
import {HttpClient} from '@angular/common/http';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class ForumPostService {

  forumPostCollection: AngularFirestoreCollection<Post>;
  commentCollection: AngularFirestoreCollection<Comment>;
  forumPosts: Observable<Post[]>;

  constructor(private db: AngularFirestore, private fileService: FileService, private http: HttpClient) { }


  getForumPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://us-central1-cibushub.cloudfunctions.net/Posts');
  }


  getForumPostById(postId: string): Observable<any> {
    return this.db.collection<Post>('post').doc(postId).valueChanges();
  }

  addComment(postId: string, comment: Comment): Promise<any> {
    this.commentCollection = this.db.collection<Post>('post').doc(postId).collection<Comment>('comments');
    return this.commentCollection.add(comment);
  }

  getForumPostWithComments(id: string): Observable<any[]> {
    return this.db.collection<Post>('post').doc(id).collection('comments', ref => ref.orderBy('time', 'desc')).valueChanges();
  }

  addPostWithImage(post: Post, imageMeta: ImageMetaData): Observable<Post> {

    if (imageMeta && imageMeta.fileMeta
      && imageMeta.fileMeta.name && imageMeta.fileMeta.type &&
      (imageMeta.imageBlob || imageMeta.base64Image)) {

      const endPoint = 'https://us-central1-cibushub.cloudfunctions.net/Posts';
      const postToSend: any = {
        postName: post.postName,
        postTime: post.postTime,
        postDescription: post.postDescription,
        uId: post.uId,
        userDisplayUrl: post.userDisplayUrl,
        userDisplayName: post.userDisplayName,

        image: {
          base64: imageMeta.base64Image,
          name: imageMeta.fileMeta.name,
          type: imageMeta.fileMeta.type,
          size: imageMeta.fileMeta.size
        }
      };
      console.log(postToSend);
      return this.http.post<Post>(endPoint, postToSend);

    }
  }

  getForumPostsFromUser(userId: string): Observable<Post[]> {
    /*return this.db.collection<Post>('post', ref => ref.where('uId', '==', userId)).valueChanges();*/
    this.forumPostCollection = this.db.collection<Post>('post', ref => ref.where('uId', '==', userId));
    return this.forumPosts = this.forumPostCollection.snapshotChanges().pipe(map( actions => {
      return actions.map( action => {
        const data = action.payload.doc.data() as Post;
        const id = action.payload.doc.id;
        return{id, ...data};
      });
    }));
  }

  deletePost(postId: string): Promise<any> {
    return this.db.collection<Post>('post').doc(postId).delete();
  }
}
