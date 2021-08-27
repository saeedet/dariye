const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

// on new user create
exports.userCreated = functions.auth.user().onCreate((user) => {
  db.collection("users")
    .doc(user.uid)
    .set(JSON.parse(JSON.stringify(user)));
});

// on new like add
exports.postLiked = functions.firestore
  .document("users/{userId}/likes/{postId}")
  .onCreate((doc) => {
    admin
      .firestore()
      .collection("posts")
      .doc(doc.id)
      .update({
        likes: admin.firestore.FieldValue.increment(1),
      });
  });

// on like remove
exports.postUnliked = functions.firestore
  .document("users/{userId}/likes/{postId}")
  .onDelete((doc) => {
    admin
      .firestore()
      .collection("posts")
      .doc(doc.id)
      .update({
        likes: admin.firestore.FieldValue.increment(-1),
      });
  });
