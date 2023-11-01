import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6M3_DZX7N5J3aV1HM5sZHPMhyYfP_MqY",
  authDomain: "loginmern-1abdd.firebaseapp.com",
  projectId: "loginmern-1abdd",
  storageBucket: "loginmern-1abdd.appspot.com",
  messagingSenderId: "436542843996",
  appId: "1:436542843996:web:348af1c5feaeb319a10a99",
  measurementId: "G-ERL08EFTLV",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
