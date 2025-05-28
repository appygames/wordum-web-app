import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCetmeNwc4J3gDzcoYaARwyP3McEsMR4FI",
  authDomain: "wordum-game-5f739.firebaseapp.com",
  databaseURL: "https://wordum-game-5f739-default-rtdb.firebaseio.com",
  projectId: "wordum-game-5f739",
  storageBucket: "wordum-game-5f739.firebasestorage.app",
  messagingSenderId: "157228117213",
  appId: "1:157228117213:web:5258dbcff2ccc03187bf34",
  measurementId: "G-8QXZDYFDZX",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

export const getGameById = async (id: string) => {
  try {
    const docRef = doc(db, "userGames", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
};
