"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  role: "admin" | "student" | "customer" | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  registerWithEmail: (email: string, password: string, name: string) => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<"admin" | "student" | "customer" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          // Fetch user role from Firestore
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          
          if (userDoc.exists()) {
            let userRole = userDoc.data().role;
            // FOR DEV: Auto-grant admin to "deep"
            if (currentUser.displayName?.toLowerCase().includes("deep")) {
              userRole = "admin";
            }
            setRole(userRole);
          } else {
            // If new user, default to "customer"
            const userRole = currentUser.displayName?.toLowerCase().includes("deep") ? "admin" : "customer";
            const newUser = {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              role: userRole,
              createdAt: new Date().toISOString(),
            };
            // Only try to setDoc if we can, otherwise just set local state
            try {
              await setDoc(doc(db, "users", currentUser.uid), newUser);
            } catch (e) {
              console.warn("Could not save new user to Firestore (permissions)");
            }
            setRole(userRole);
          }
        } catch (error) {
          console.warn("Firestore role check failed, defaulting based on name:", error);
          const userRole = currentUser.displayName?.toLowerCase().includes("deep") ? "admin" : "customer";
          setRole(userRole);
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const registerWithEmail = async (email: string, password: string, name: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: name });
      
      // Save user to firestore explicitly to guarantee displayName is saved
      const userRole = name.toLowerCase().includes("deep") ? "admin" : "customer";
      const newUser = {
        uid: res.user.uid,
        email: res.user.email,
        displayName: name,
        photoURL: res.user.photoURL,
        role: userRole,
        createdAt: new Date().toISOString(),
      };
      
      try {
        await setDoc(doc(db, "users", res.user.uid), newUser);
      } catch (e) {
        console.warn("Could not save new user to Firestore on register:", e);
      }
      
      setRole(userRole);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const loginWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Login with email failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      role, 
      loading, 
      loginWithGoogle, 
      logout,
      registerWithEmail,
      loginWithEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
