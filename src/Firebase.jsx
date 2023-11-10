import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhclizk98ZiIyvck2o0Bs6pn7qF_M22Wc",

  authDomain: "payinstacard-new.firebaseapp.com",

  projectId: "payinstacard-new",

  storageBucket: "payinstacard-new.appspot.com",

  messagingSenderId: "858580304506",

  appId: "1:858580304506:web:e3343ace0ce3e5e67271c3",

  measurementId: "G-2TTY9FTDCR",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
export const getAccessToken = async () => {
  return await auth?.currentUser?.getIdToken(true);
};
export const logout = () => {
  return signOut(auth);
};
// const analytics = getAnalytics(app);
export default app;
