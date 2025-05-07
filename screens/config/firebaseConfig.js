import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; 
// import { getAnalytics } from "firebase/analytics"; //!! commented at the mooment (no use)

const firebaseConfig = {
  apiKey: "AIzaSyCKYaEva51udJXjIhx6jXYYVZvdBEKUrSU",
  authDomain: "meal-planner-7f3ee.firebaseapp.com",
  projectId: "meal-planner-7f3ee",
  storageBucket: "meal-planner-7f3ee.firebasestorage.app",
  messagingSenderId: "423033959243",
  appId: "1:423033959243:web:59547deae40ddff819eece",
  measurementId: "G-MVKM9SF5TH"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); //!! commmendted at the moment (no use)
const db = getFirestore(app);

export { db };


// import { db } from './firebase/firebaseConfig';
// You can now use db with Firestore functions