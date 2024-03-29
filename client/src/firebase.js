import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey:VITE_REACT_APP_API_KEY,
  authDomain: "ytfullstack.firebaseapp.com",
  projectId: "ytfullstack",
  storageBucket: "ytfullstack.appspot.com",
  messagingSenderId: "590425572528",
  appId: "1:590425572528:web:6aaf23f263a8d7c4926775"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const provider=new GoogleAuthProvider();
provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });
export default app;