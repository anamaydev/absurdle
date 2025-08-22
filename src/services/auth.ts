import { signInWithPopup, signOut, GoogleAuthProvider, type UserCredential } from "firebase/auth";
import { auth } from "../lib/firebase";

export function signInWithGoogle(): Promise<UserCredential>{
    const provider = new GoogleAuthProvider;
    return signInWithPopup(auth, provider);
}

export function logOut(): Promise<void>{
    return signOut(auth);
}