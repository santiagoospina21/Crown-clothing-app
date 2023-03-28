import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbpBuwUvZTqgQiFKb3wW1oq6CSu0yUMtU",
  authDomain: "crown-clothing-93715.firebaseapp.com",
  projectId: "crown-clothing-93715",
  storageBucket: "crown-clothing-93715.appspot.com",
  messagingSenderId: "768167379806",
  appId: "1:768167379806:web:9cb5cbff3acd0336e605cf",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//Database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  addionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid); //database, collection , document

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    //Si el usuario no existe
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      //creamos el usuario
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...addionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};

//Create user with email and password

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
