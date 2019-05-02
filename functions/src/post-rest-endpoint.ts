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

    console.log(listOfPosts);
    response.json(listOfPosts)
  }).catch(e=> {console.log(e)})
}

  else if (request.method === 'POST'){
    console.log('1');
    const data = request.body;

    const post: any = {
      postName: data.postName,
      postTime: data.postTime,
      postDescription: data.postDescription,
    };
    const file = {
      name: data.image.name,
      type: data.image.type,
      size: data.image.size
    };
    console.log('2')
    try {
      console.log('2.1');
      console.log(file);
      const value = await admin.firestore().collection('files').add(file).then();
      console.log('3');
        //Encode base64 and save it to Storage
      const base64EncodedImageString = data.image.base64.replace(/^data:image\/\w+;base64,/, '');
      const imageBuffer = new Buffer(base64EncodedImageString, 'base64');

      console.log('4')
      await admin.storage().bucket().file('post-pictures/' + value.id)
        .save(imageBuffer, {
          gzip: true,
          metadata: {
            contentType: file.type
          }
        }).then();

      console.log('5')
      //Saves the Post metadata to firestore
      post.pictureId = value.id;
      const aPost = await admin.firestore().collection('post')
        .add(post)
        .then();
      console.log('6')
      post.id = aPost.id;
      console.log(post);
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
