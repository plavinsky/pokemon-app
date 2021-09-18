// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/database";
//import "firebase/database";

//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpWmC-M6rJUNfHaP7s8NiJ6-WdtvWgBmw",
  authDomain: "pokemon-game-2bc55.firebaseapp.com",
  databaseURL: "https://pokemon-game-2bc55-default-rtdb.firebaseio.com",
  projectId: "pokemon-game-2bc55",
  storageBucket: "pokemon-game-2bc55.appspot.com",
  messagingSenderId: "438028951268",
  appId: "1:438028951268:web:6ecf11f19340078c1916f1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

// export async function getPokemons(database) {
//     const pokemonsCol = collection(database, 'pokemons');
//     const pokemonsSnapshot = await getDocs(pokemonsCol);
//     const pokemonsList = pokemonsSnapshot.docs.map(doc => doc.data());
//     return pokemonsList;
//   }

export default database;