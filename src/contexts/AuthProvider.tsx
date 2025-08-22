import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { signInWithGoogle, logOut, getFourLetterWords, getFiveLetterWords } from "../services/auth";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../lib/firebase";

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [fiveLetterWords, setFiveLetterWords] = useState<string[] | null>(null);
  const [fourLetterWords, setFourLetterWords] = useState<string[] | null>(null);
  const [wordListLoading, setWordListLoading] = useState<boolean>(false);

  /* track user login/logout activity using listner */
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser)=>{
      setUser(firebaseUser);
      setUserLoading(false);
    })

    return () => unsubscribe();
  },[]);

  /* fetch all the words */
  useEffect(()=>{
    if(!user) return;
    setWordListLoading(true);
    const fetchAllWords = async () => {
      try {
        const [fourLetterWordsData, fiveLetterWordsData] = await Promise.all([
          getFourLetterWords(),
          getFiveLetterWords()
        ])
        setFourLetterWords(fourLetterWordsData);
        setFiveLetterWords(fiveLetterWordsData);
      } catch (err) {
        console.error(err)
      }finally{
        setWordListLoading(false)
      }
    }

    fetchAllWords();
  },[user])

  useEffect(()=>{
    if(process.env.NODE_ENV === "development"){
      console.log("user: ", user);
    }
  },[user]);

  useEffect(()=>{
    if (process.env.NODE_ENV === 'development'){
      console.log("4LW: ", fourLetterWords);
      console.log("5LW: ", fiveLetterWords);
    }
  },[fourLetterWords, fiveLetterWords])

  return (
    <AuthContext.Provider value={{user, userLoading ,signInWithGoogle, logOut, fourLetterWords, fiveLetterWords, wordListLoading}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;