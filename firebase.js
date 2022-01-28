import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

 const firebaseConfig = {
   apiKey: "AIzaSyBVnhy7RGLeKxhzywHJ2e5RV5HjYaQYQhQ",
   authDomain: "home-db-ed6f0.firebaseapp.com",
   projectId: "home-db-ed6f0",
   storageBucket: "home-db-ed6f0.appspot.com",
   messagingSenderId: "3177858927",
   appId: "1:3177858927:web:aeb4b8b013b35165564a9a"
 };

const firebase = initializeApp(firebaseConfig);

export const firebaseDb = getDatabase(firebase);
// console.log('firebase', firebaseDb);

{
  firebaseConfig,
  firebase,
  firebaseDb
}