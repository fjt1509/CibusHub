import * as admin from 'firebase-admin';
import * as deletePosts from './delete-posts-function'
import * as Posts from './post-rest-endpoint'
import * as uploadNewPostImage from './upload-new-product-image-function'




admin.initializeApp();

module.exports = {
  ...deletePosts,
  ...Posts,
  ...uploadNewPostImage

}





