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