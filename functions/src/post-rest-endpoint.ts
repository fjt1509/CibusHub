import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as corsModule from 'cors';

const cors = corsModule({origin:true})


exports.Posts = functions.https.onRequest( (request, response) => {
  cors(request, response, async () => {
  if (request.method === 'GET') {
    admin.firestore().collection('post').get().then(posts => {

      const listOfPosts: any = [];

      posts.forEach(post => {

        let aPost = post.data();
        aPost.id = post.id;
        listOfPosts.push(aPost);
    });

    response.json(listOfPosts)
  }).catch(e=> {console.log(e)})
}

  else if (request.method === 'POST'){
    const data = request.body;

    const post: any = {
      postName: data.postName,
      postTime: data.postTime,
      postDescription: data.postDescription,
      uId: data.uId,
      userDisplayUrl: data.userDisplayUrl,
      userDisplayName: data.userDisplayName,
    };
    const file = {
      name: data.image.name,
      type: data.image.type,
      size: data.image.size
    };
    try {
      const value = await admin.firestore().collection('files').add(file).then();

      const base64EncodedImageString = data.image.base64.replace(/^data:image\/\w+;base64,/, '');
      const imageBuffer = new Buffer(base64EncodedImageString, 'base64');

      await admin.storage().bucket().file('post-pictures/' + value.id)
        .save(imageBuffer, {
          gzip: true,
          metadata: {
            contentType: file.type
          }
        }).then();

      post.pictureId = value.id;
      const aPost = await admin.firestore().collection('post')
        .add(post)
        .then();
      post.id = aPost.id;
      console.log(post);
      response.json(post);
    } catch (err) {
      response.send(err)
    }
  }

  else if (request.method === 'PUT') {
    const data = request.body;

    if(data.image) {

      const post: any = {
        id: data.id,
        pictureId: data.pictureId,
        postName: data.postName,
        postTime: data.postTime,
        postDescription: data.postDescription,
        uId: data.uId,
        userDisplayUrl: data.userDisplayUrl,
        userDisplayName: data.userDisplayName,
      };
      const file = {
        name: data.image.name,
        type: data.image.type,
        size: data.image.size
      };

      try {
        await admin.firestore().collection('files').doc(post.pictureId).set(file).then();

        const base64EncodedImageString = data.image.base64.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = new Buffer(base64EncodedImageString, 'base64');

        await admin.storage().bucket().file('post-pictures/' + post.pictureId).save(imageBuffer, {
          gzip: true,
          metadata: {contentType: file.type}
        }).then();

        await admin.firestore().collection('post').doc(post.id).set(post, {merge: true}).then();

        response.json(post);
      } catch (err) {
        response.send(err);
      }
    }

    else {
      const post: any = {
        id: data.id,
        pictureId: data.pictureId,
        postName: data.postName,
        postTime: data.postTime,
        postDescription: data.postDescription,
        uId: data.uId,
        userDisplayUrl: data.userDisplayUrl,
        userDisplayName: data.userDisplayName,
      };

      try {
        await admin.firestore().collection('post').doc(post.id).set(post, {merge: true}).then();
        response.json(post);
      } catch (e) {
        response.send(e);
      }
    }
  }

  else {
    console.log('Method: ' + request.method);
    response.send("Does not support this request, try GET, POST and PUT")
  }
});
});
