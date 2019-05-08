import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

exports.deletePost = functions.firestore.document('post/{postID}').onDelete((snap, context) => {
  return new Promise(async (resolve, reject) => {

    const id = snap.id;
    const deletedPost = snap.data();
    try {
      if (deletedPost) {
        await admin.firestore().collection('post').doc(id).collection('comments').get().then( snapQue => snapQue.forEach(doc => doc.ref.delete()));
        await admin.firestore().collection('files').doc(deletedPost.pictureId).delete().then();
        const resultFromStorage = await admin.storage().bucket().file('post-pictures/' + deletedPost.pictureId).delete().then()
        resolve(resultFromStorage);
      }
    } catch (error) {
      reject(error);
    }
  });
});
