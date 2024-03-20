import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: process.env.GOOGLEAPIKEY,
  authDomain: "ytfullstack.firebaseapp.com",
  projectId: "ytfullstack",
  storageBucket: "ytfullstack.appspot.com",
  messagingSenderId: "590425572528",
  appId: "1:590425572528:web:6aaf23f263a8d7c4926775"
};
export const auth=getAuth();
export const provider=new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
export default app;