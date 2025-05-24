import {initializeApp} from 'firebase/app';
const firebaseConfig = {
  apiKey: "AIzaSyCetmeNwc4J3gDzcoYaARwyP3McEsMR4FI",
  authDomain: "wordum-game-5f739.firebaseapp.com",
  projectId: "wordum-game-5f739",
  storageBucket: "wordum-game-5f739.firebasestorage.app",
  messagingSenderId: "157228117213",
  appId: "1:157228117213:web:5258dbcff2ccc03187bf34",
  measurementId: "G-8QXZDYFDZX",
  databaseURL: "https://wordum-game-5f739-default-rtdb.firebaseio.com"
};

export const app = initializeApp(firebaseConfig);