import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.config';
import { axiosSecure } from '../Hook/useAxios';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const accessTokenKey = 'access-token';

const storeAccessToken = (token) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(accessTokenKey, token);
    }
};

const clearAccessToken = () => {
    if (typeof window !== 'undefined') {
        window.localStorage.removeItem(accessTokenKey);
    }
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState('user');
    const [loading, setLoading] = useState(true);

    const saveUserToBackend = async (userInfo) => {
        const userPayload = {
            name: userInfo?.displayName || userInfo?.name || '',
            email: userInfo?.email,
            role: 'user',
        };

        if (!userPayload.email) {
            return;
        }

        try {
            await axiosSecure.post('/users', userPayload);
        } catch {
            // Ignore duplicate-save failures; the user may already exist.
        }
    };

    const requestAccessToken = async (email) => {
        if (!email) {
            return '';
        }

        const response = await axiosSecure.post('/jwt', { email });
        const token = response.data?.token || '';

        if (token) {
            storeAccessToken(token);
        }

        return token;
    };

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser?.email) {
                try {
                    let token = '';

                    try {
                        token = await requestAccessToken(currentUser.email);
                    } catch {
                        token = '';
                    }

                    if (!token) {
                        await saveUserToBackend({ displayName: currentUser.displayName, email: currentUser.email });

                        try {
                            token = await requestAccessToken(currentUser.email);
                        } catch {
                            token = '';
                        }
                    }

                    const response = await axiosSecure.get(`/users?email=${currentUser.email}`);
                    const storedUser = Array.isArray(response.data) ? response.data[0] : null;

                    if (storedUser) {
                        setUserRole(storedUser.role || 'user');
                    } else {
                        setUserRole('user');
                        if (!token) {
                            await saveUserToBackend({ displayName: currentUser.displayName, email: currentUser.email });

                            try {
                                await requestAccessToken(currentUser.email);
                            } catch {
                                // Ignore token refresh failures here; the next auth change will retry.
                            }
                        }
                    }
                } catch {
                    setUserRole('user');
                }
            } else {
                setUserRole('user');
                clearAccessToken();
            }

            setLoading(false);
        });

        return () => {
            unSub();
        };
    }, []);

    const creatUser = async (name, email, pass) => {
        setLoading(true);
        const result = await createUserWithEmailAndPassword(auth, email, pass);
        await updateProfile(result.user, { displayName: name });
        await saveUserToBackend({ displayName: name, email });
        await requestAccessToken(email);
        setUserRole('user');
        return result;
    };

    const singIn = (email, pass) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, pass);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider).then(async (result) => {
            await saveUserToBackend(result.user);
            await requestAccessToken(result.user?.email);
            return result;
        });
    };

    const logOut = () => {
        setLoading(true);
        clearAccessToken();
        return signOut(auth);
    };

    const authInfo = {
        user,
        userRole,
        loading,
        creatUser,
        singIn,
        googleSignIn,
        logOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;