import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

exports.uploadNewPostImage = functions.storage.object().onFinalize((object)=>{

  return new Promise((resolve, reject) => {

    if(object.metadata && object.name)
    {
      const fileMeta = {
        lastModified: object.updated,
        name: object.metadata.originalName,
        type: 'image/png',
        size: object.size
      };
      const nameForDoc = object.name.split('/')[1];
      admin.firestore().collection('files')
        .doc(nameForDoc)
        .set(fileMeta)
        .then(metaData =>resolve(metaData))
        .catch(err => reject(err))

    }else {
      reject('ERROR: Not enough Metadata!')
    }
  });
});
