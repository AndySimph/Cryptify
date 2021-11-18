import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
//import { getAuth } from "firebase/auth";

import Firebase from '../services/firebase';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import HomeNavigation from './HomeStack';

const auth = Firebase.auth();
db = Firebase.firestore();

export default function RootNavigator2() {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    //isLoading is state of being checked with Firebase Auth service
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        // onAuthStateChanged returns an unsubscriber
        const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
            try {
                await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
                setIsLoading(false);
                //console.log("LOG HERE")
                //console.log(authenticatedUser.uid)
                //Create database entry for userID if one doesn't exist already
                const userRef = db.collection('users').doc(authenticatedUser.uid);
                userRef.get()
                    .then((docSnapshot) => {
                        if (!docSnapshot.exists){
                            userRef.set({
                                balance:10000
                            })
                        }
                    })
            } catch (error) {
                console.log(error);
            }
            
        });
  
        // unsubscribe auth listener on unmount
        return unsubscribeAuth;
    }, []);
  
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        );
    }
  
    return (
        <NavigationContainer>
            {user ? <HomeNavigation /> : <AuthStack />}
        </NavigationContainer>
    );
}