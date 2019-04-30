import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as corsModule from 'cors';

const cors = corsModule({origin:true})

exports.Posts = functions.https.onRequest( (request, response) => {
  cors(request, response, async () => {
  if (request.method === 'GET') {
  admin.firestore().collection('post')
    .get()
    .then(posts => {
    const listOfPosts: any = [];
    posts.forEach(post => {
      let aPost = post.data();
      aPost.id = post.id;
      listOfPosts.push(aPost);
    })
    response.json(listOfPosts)
  }).catch(e=> {console.log(e)})
}

  else if (request.method === 'POST'){
    const data = request.body;

    const post: any = {name: data.name};
    const file = {
      name: data.name,
      type: data.type,
      size: data.size
    };
    try {
      const value = await admin.firestore().collection('files')
        .add(file)
        .then();
        //Encode base64 and save it to Storage
      const base64EncodedImageString = data.image.base64.replace(/^data:image\/\w+;base64,/, '');
      const imageBuffer = new Buffer(base64EncodedImageString, 'base64');
      await admin.storage().bucket().file('post-pictures/' + value.id)
        .save(imageBuffer, {
          gzip: true,
          metadata: {
            contentType: file.type
          }
        }).then();
      //Saves the Post metadata to firestore
      post.pictureId = value.id;
      const aPost = await admin.firestore().collection('post')
        .add(post)
        .then();
      post.id = aPost.id;
      response.json(post);
    } catch (err) {
      response.send(err)
    }
  } else {
    console.log('Method: ' + request.method);
    response.send("Does not support this request, try GET and POST")
  }
});
});
