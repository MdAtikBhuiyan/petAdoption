import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const AuthContext = createContext(null)
const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isLoading, setLoading] = useState(true)


    // create an account 
    const signUp = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // sign in user
    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google login
    const googleProvider = new GoogleAuthProvider();
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    // sign out user
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    // observe user
    useEffect(() => {

        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser);
            setUser(currentUser)
            setLoading(false)

        })

        return () => unSubscribe()

    }, [])



    const authInfo = {
        user,
        isLoading,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;