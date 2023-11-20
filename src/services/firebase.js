import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const isProduction = true;

const firebaseConfig = {
  apiKey: "AIzaSyB6M3_DZX7N5J3aV1HM5sZHPMhyYfP_MqY",
  authDomain: "loginmern-1abdd.firebaseapp.com",
  projectId: "loginmern-1abdd",
  storageBucket: "loginmern-1abdd.appspot.com",
  messagingSenderId: "436542843996",
  appId: "1:436542843996:web:348af1c5feaeb319a10a99",
  measurementId: "G-ERL08EFTLV",
};

const firebaseConfigProduction = {
  apiKey: "AIzaSyDr1huD0xfzbwbEDSkQ-v2LyH480NAHWGw",
  authDomain: "pensook-2b981.firebaseapp.com",
  projectId: "pensook-2b981",
  storageBucket: "pensook-2b981.appspot.com",
  messagingSenderId: "773304824265",
  appId: "1:773304824265:web:4f0ce686d7e4987ff3b818",
  measurementId: "G-3JJWZQZF6W",
};

firebase.initializeApp(
  isProduction ? firebaseConfigProduction : firebaseConfig
);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
