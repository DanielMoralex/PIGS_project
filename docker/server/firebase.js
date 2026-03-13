import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs} from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "karaokelingo.firebaseapp.com",
  projectId: "karaokelingo",
  storageBucket: "karaokelingo.firebasestorage.app",
  messagingSenderId: "91242052944",
  appId: "1:91242052944:web:72d402ed87020a308a0055",
  measurementId: "G-N6WEDSYW1P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get the Firestore instance
const db = getFirestore(app);

const usersCollection = collection(db, "users");

// Add a user
//await addDoc(usersCollection, {
//  name: "Alice",
//  email: "alice@example.com",
//});

// Get a list of users
const querySnapshot = await getDocs(usersCollection);
querySnapshot.forEach((doc) => {
  console.log(doc.id, ": ", doc.data());
})



