import {Post} from '../shared/post.model';
import {ImageMetaData} from '../../files/shared/image-metadata.model';


export class GetPosts {
  static readonly type = '[Post] Get';
}

export class AddPost {
  static readonly type = '[Post] Add';
  constructor(public payload: Post, public imageData: ImageMetaData) {}
}

export class UpdatePostIncPic {
  static readonly type = '[Post] UpdateWP';
  constructor(public payload: Post, public imageData: ImageMetaData) {}
}

export class UpdatePost {
  static readonly type = '[Post] Update';
  constructor(public payload: Post) {}
}

export class DeletePost {
  static readonly type = '[Post] Delete';
  constructor(public id: string) {}
}


export class SetSelectedPost {
  static readonly type = '[Post] Set';
  constructor (public payload: Post) {}
}

