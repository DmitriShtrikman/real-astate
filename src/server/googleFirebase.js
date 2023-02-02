import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, child } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAClSHATIAMG2wLVdhn8VkrWQGt-cr-nEo",
    authDomain: "antalya-realty.firebaseapp.com",
    databaseURL: "https://antalya-realty-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "antalya-realty",
    storageBucket: "antalya-realty.appspot.com",
    messagingSenderId: "827813591412",
    appId: "1:827813591412:web:802cdfc4926f6e5e005421",
    measurementId: "G-PGJ27FCMNM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const database = getDatabase(app);
export const dataRef = ref(database);

// const dbRef = ref(getDatabase());

// export const objectData = get(dbRef).then((snapshot) => {
//     if (snapshot.exists()) {
//         // console.log(snapshot.val());
//     } else {
//         console.log("No data available");
//     }
// }).catch((error) => {
//         console.error(error);
// });


