import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp()
exports.posts = functions.https.onRequest((request, response) => {
  admin.firestore().collection('post').get().then(posts => {
    console.log(posts)
  }).catch(err=> {console.log(err)})

});
