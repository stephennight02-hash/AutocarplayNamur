import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBXz44eewV33LeEI2gKNCQAiIvrN9WmTCI",
  authDomain: "autocarplaynamur.firebaseapp.com",
  projectId: "autocarplaynamur",
  storageBucket: "autocarplaynamur.firebasestorage.app",
  messagingSenderId: "1036998072469",
  appId: "1:1036998072469:web:dad85f41df35edeb51639c",
  measurementId: "G-FL2QNDCY97"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  console.log("Connecting to Firestore...");
  try {
    const querySnapshot = await getDocs(collection(db, "requests"));
    console.log("Success! Found", querySnapshot.size, "documents.");
    process.exit(0);
  } catch (e) {
    console.error("Error connecting to Firestore:", e);
    process.exit(1);
  }
}

test();
