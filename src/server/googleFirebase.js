import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";

/*-- Firebase connection --*/

const firebaseConfig = {
    apiKey: "AIzaSyAClSHATIAMG2wLVdhn8VkrWQGt-cr-nEo",
    authDomain: "antalya-realty.firebaseapp.com",
    databaseURL: "https://antalya-realty-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "antalya-realty",
    storageBucket: "antalya-realty.appspot.com",
    messagingSenderId: "827813591412",
    appId: "1:827813591412:web:802cdfc4926f6e5e005421",
    measurementId: "G-PGJ27FCMNM",
    // storageBucket: 'gs://antalya-realty.appspot.com/'
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export const database = getDatabase(app);
export const dataUsersRef = ref(database, 'fulldb');
export const dataRef = ref(database, 'deployDb');
export const regionDataRef = ref(database, 'regions');
export const userRef = ref(database, 'users');

// console.log(regionDataRef);

export const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
};
  
export const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
};

export const logOut = async () => await signOut(auth)

export const onAuth = async () => {
    await onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log('Loged in')
          } else {            
            console.log('Loged out')
          }
    })
};

export const checkuser = () => {
    if (auth.currentUser) {
        return true
    } else {
        return false
    }
};

export const checkadmin = () => {
    if(auth.currentUser) {
        if (auth.currentUser.uid === process.env.REACT_APP_UID && auth.currentUser.email === process.env.REACT_APP_E_MAIL) {
            return true
        } else {
            return false;
        }
    } else {
        return false;
    }
};