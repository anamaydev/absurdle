import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { signInWithGoogle, logOut } from "../services/auth";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../lib/firebase";

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  /* track user login/logout activity using listner */
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser)=>{
      setUser(firebaseUser);
      setUserLoading(false);
    })

    return () => unsubscribe();
  },[]);

  useEffect(()=>{
    console.log("user: ", user);
  },[user]);

  return (
    <AuthContext.Provider value={{user, userLoading ,signInWithGoogle, logOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;