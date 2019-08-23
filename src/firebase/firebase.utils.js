import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCPce9R7mdFrcwHT8p_nUaFb4IiwDD9VZY",
  authDomain: "e-commerce-udemy.firebaseapp.com",
  databaseURL: "https://e-commerce-udemy.firebaseio.com",
  projectId: "e-commerce-udemy",
  storageBucket: "e-commerce-udemy.appspot.com",
  messagingSenderId: "651631579265",
  appId: "1:651631579265:web:66acf0efcb6d04b0"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: "select_account"});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
