import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null)
const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()

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

    // github signin
    const githubProvider = new GithubAuthProvider()
    const githubSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, githubProvider)
    }

    // sign out user
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    // update user info
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    // observe user
    useEffect(() => {

        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser);

            if (currentUser) {
                // get token and store client site
                const userInfo = {
                    email: currentUser?.email || user?.email,
                }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        console.log("auth jwt res", res);
                        if (res.data?.token) {
                            localStorage.setItem("access-pet-token", res.data?.token);
                            
                            setUser(currentUser)
                            setLoading(false)
                        }
                    })
            }
            else {
                // remove token
                localStorage.removeItem('access-pet-token');
                setLoading(false)
                setUser(currentUser)
            }

        })

        return () => unSubscribe()

    }, [axiosPublic, user?.email])



    const authInfo = {
        user,
        isLoading,
        signUp,
        logIn,
        googleSignIn,
        githubSignIn,
        logOut,
        updateUserProfile,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;