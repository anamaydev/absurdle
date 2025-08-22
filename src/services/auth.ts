import { signInWithPopup, signOut, GoogleAuthProvider, type UserCredential } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, getDoc} from "firebase/firestore";


export function signInWithGoogle(): Promise<UserCredential>{
  const provider = new GoogleAuthProvider;
  return signInWithPopup(auth, provider);
}

export function logOut(): Promise<void>{
  return signOut(auth);
}

export async function getFourLetterWords(): Promise<string[]>{
  const docRef = doc(db, "words", "fourLetterWords")
  const snapshot = await getDoc(docRef);

  if(snapshot.exists()){
    const data = snapshot.data();
    return data.words;
  }else{
    console.log("Document not found!");
    return[];
  }
}

export async function getFiveLetterWords(): Promise<string[]>{
  const docRef = doc(db, "words", "fiveLetterWords");
  const snapshot = await getDoc(docRef);

  if(snapshot.exists()){
    const data = snapshot.data();
    return data.words;
  }else{
    console.log("Document not found!");
    return[]
  }
}