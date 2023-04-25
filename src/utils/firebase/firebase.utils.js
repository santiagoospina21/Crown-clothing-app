import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

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

//Create collection and Documents
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

//Get data from fireBase
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};

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

//Sign in with email and password

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

//SignOut User
export const signOutUser = async () => await signOut(auth);

//Observer Listener
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
