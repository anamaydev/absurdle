import type { User, UserCredential } from "firebase/auth";
import { createContext } from "react";

type AuthContextType = {
  user: User | null,
  userLoading: boolean, 
  signInWithGoogle: () => Promise<UserCredential>,
  logOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);