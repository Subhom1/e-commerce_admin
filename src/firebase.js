import firebase from "firebase";
import { SET_CURRENT_USER } from "./auth/auth.actions";
import { store } from "./redux/store";
const firebaseConfig = {
  apiKey: "AIzaSyCN1CT9gnI7AJ7aaITRYorrSV-q465-yaQ",
  authDomain: "fir-crud-7493a.firebaseapp.com",
  databaseURL: "https://fir-crud-7493a.firebaseio.com",
  projectId: "fir-crud-7493a",
  storageBucket: "fir-crud-7493a.appspot.com",
  messagingSenderId: "367178800612",
  appId: "1:367178800612:web:46bd161472e29576ff7bf1",
  measurementId: "G-FDH503SLXJ",
};

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.db = firebase.database();
  }
  authObserver() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log(!!user, "user signed in");
        localStorage.setItem("is_user_loggedIn", !!user);
        store.dispatch(SET_CURRENT_USER(user));
        return user;
      } else {
        // No user is signed in.
        console.log("user signned out");
        localStorage.setItem("is_user_loggedIn", !!user);
        store.dispatch(SET_CURRENT_USER(user));
        return null;
      }
    });
  }
  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    return this.auth.signOut();
  }
  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }
}
export default new Firebase();
