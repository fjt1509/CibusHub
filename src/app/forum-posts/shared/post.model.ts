import {Comment} from './comment.model';

export class Post  {
  id?: string;
  postName: string;
  postDescription: string;
  postTime?: Date;
  comments?: Comment[];
  pictureId?: string;
  url?: string;
}
