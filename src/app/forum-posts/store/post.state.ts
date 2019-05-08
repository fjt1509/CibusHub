import {State, Action, StateContext, Selector} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import {Post} from '../shared/post.model';
import {ForumPostService} from '../shared/forum-post.service';
import {AddPost, DeletePost, GetPosts, SetSelectedPost, UpdatePost, UpdatePostIncPic} from './post.action';

export class PostStateModel {
  posts: Post[];
  selectedPost: Post;
}

@State<PostStateModel>({
  name: 'posts',
  defaults: {
    posts: [],
    selectedPost: null
  }
})

export class PostState {

  constructor(private postServ: ForumPostService) {}

  @Selector()
  static getPostList(state: PostStateModel) {
    return state.posts;
  }

  @Selector()
  static getSelectedPost(state: PostStateModel) {
    return state.selectedPost;
  }

  @Action(GetPosts)
  getPosts({getState, setState}: StateContext<PostStateModel>) {
    console.log('test');
    return this.postServ.getForumPosts().pipe(tap((result) => {
      const state = getState();
      setState({...state, posts: result});
    }));
  }

  @Action(AddPost)
  addPost({getState, patchState}: StateContext<PostStateModel>, {payload, imageData}: AddPost) {
    return this.postServ.addPostWithImage(payload, imageData).pipe(tap((result) => {
      const state = getState();
      patchState({posts: [...state.posts, result]});
    }));
  }

  @Action(UpdatePostIncPic)
  updatePostIncPic({getState, setState}: StateContext<PostStateModel>, {payload, imageData}: UpdatePostIncPic) {
    return this.postServ.updatePostWithNewImage(payload, imageData).pipe(tap((result) => {
      const state = getState();
      const postList = [...state.posts];
      const postIndex = postList.findIndex(item => item.id === payload.id);
      postList[postIndex] = result;
      setState({...state, posts: postList});
    }));
  }

  @Action(UpdatePost)
  updatePost({getState, setState}: StateContext<PostStateModel>, {payload}: UpdatePost) {
    return this.postServ.updatePostNoNewImage(payload).pipe(tap((result) => {
      const state = getState();
      const postList = [...state.posts];
      const postIndex = postList.findIndex(item => item.id === payload.id);
      postList[postIndex] = result;
      setState({...state, posts: postList});
    }));
  }

  @Action(DeletePost)
  deletePost({getState, setState}: StateContext<PostStateModel>, {id}: DeletePost) {
    return this.postServ.deletePost(id).then(tap((result) => {
      const state = getState();
      const filteredPosts = state.posts.filter(item => item.id !== id);
      setState({...state, posts: filteredPosts});
      }));
  }

  @Action(SetSelectedPost)
  setSelectedPost({getState, setState}: StateContext<PostStateModel>, {payload}: SetSelectedPost) {
    const state = getState();
    setState({...state, selectedPost: payload});
  }








}
