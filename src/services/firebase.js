// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/database";
//import "firebase/database";

//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCpWmC-M6rJUNfHaP7s8NiJ6-WdtvWgBmw",
  authDomain: "pokemon-game-2bc55.firebaseapp.com",
  databaseURL: "https://pokemon-game-2bc55-default-rtdb.firebaseio.com",
  projectId: "pokemon-game-2bc55",
  storageBucket: "pokemon-game-2bc55.appspot.com",
  messagingSenderId: "438028951268",
  appId: "1:438028951268:web:6ecf11f19340078c1916f1",
  auth: "dneizi4DuYacEyS8uk6fFwhUjwXn1ZVXShWR8l4q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


class Firebase{
  constructor() {
    this.fire = firebase;
    this.database = this.fire.database();
  }

  getPokemonSocket = (cb) => {
    this.database.ref('pokemons').on('value', (s) => {
      cb(s.val());
    });
  }

  offPokemonSocket = (cb) => {
    this.database.ref('pokemons').off('value', (s) => {
      cb(s.val());
    });
  }

  getPokemonsOnce = async (user) => {
    return await this.database.ref('pokemons').once("value").then(snapshot => snapshot.val());
    

    //return await fetch(`${firebaseConfig.databaseURL}/${user.localId}/pokemons.json?auth=${localStorage.getItem('idToken')}`).then(res => res.json());
  }

  postPokemon = (key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon);
  }

  addPokemon = (data, cb) => {
  const newKey = this.database.ref().child('pokemons').push().key;
  this.database.ref('pokemons/' + newKey).set(data).then(() => cb());

  //var user = selectUser();
  

  // fetch(`${firebaseConfig.databaseURL}/${user.localId}/pokemons.json?auth=${localStorage.getItem('idToken')}`, {
  //       method: 'POST',
  //       body: JSON.stringify(data)
  //   }).then(() => cb());

  //return newKey;
  }

  addPokemonAPI = (data, user, cb) => {
  
    //fetch(`${firebaseConfig.databaseURL}/${user.localId}/pokemons.json?auth=${localStorage.getItem('idToken')}`, {
      fetch(`${firebaseConfig.databaseURL}/${user.localId}/pokemons.json?auth=${firebaseConfig.auth}`, {
      // fetch(`${firebaseConfig.databaseURL}/${user.localId}/pokemons.json`, {
          method: 'POST',
          body: JSON.stringify(data),
          // headers: {
          //   'Authorization': 'Bearer ' + localStorage.getItem('idToken')
          // }
      }).then(() => cb());
      
  }

  
    // return 
    //debugger;
    // var resp1 = await this.database.ref('pokemons').once("value").then(snapshot => snapshot.val());

    // const resp = await fetch(`${firebaseConfig.databaseURL}/${localStorage.getItem('localId')}/pokemons.json?auth=${localStorage.getItem('idToken')}`).then(res => res.json());
  getPokemonsOnceAPI = async () => {
    // const resp = await fetch(`${firebaseConfig.databaseURL}/${localStorage.getItem('localId')}/pokemons.json`).then(res => res.json());
    const resp = await fetch(`${firebaseConfig.databaseURL}/${localStorage.getItem('localId')}/pokemons.json?auth=${firebaseConfig.auth}`).then(res => res.json());
    // const resp = await fetch(`${firebaseConfig.databaseURL}/${localStorage.getItem('localId')}/pokemons.json`, {
    //   headers: {
    //       'auth': localStorage.getItem('idToken')
    //     }
    // }).then(res => res.json());
    return resp;
  }

}


const FirebaseClass = new Firebase();

export default FirebaseClass;