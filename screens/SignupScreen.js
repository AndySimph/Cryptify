import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton } from 'react-native';

import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../services/firebase';

const auth = Firebase.auth();
db = Firebase.firestore();

export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [signupError, setSignupError] = useState('');

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const onHandleSignup = async () => {
        try {
            if (String(email) !== "" && String(password) !== "") {
                await auth.createUserWithEmailAndPassword(String(email), String(password));
                //console.log("LOG HERE")
                //console.log(auth.uid)
                //db.collection("users").doc("auth.uid").set({
                //    balance: 1000
                //});
            }
            else if (String(email) == "" && String(password) == "") {
                setSignupError("No email or password entered.")
            }
            else if (String(email) == "" && String(password) !== "") {
                setSignupError("No email entered.")
            }
            else if (String(email) !== "" && String(password) == "") {
                setSignupError("No password entered.")
            }
        } catch (error) {
            setSignupError(String(error.message));
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style='dark-content' />
            <Text style={styles.title}>Create new account</Text>
            <InputField
                inputStyle={{
                    fontSize: 14
                }}
                containerStyle={{
                    backgroundColor: '#fff',
                    marginBottom: 20
                }}
                leftIcon='email'
                placeholder='Enter email'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={true}
                value={email}
                onChangeText={text => setEmail(String(text))}
            />
            <InputField
                inputStyle={{
                    fontSize: 14
                }}
                containerStyle={{
                    backgroundColor: '#fff',
                    marginBottom: 20
                }}
                leftIcon='lock'
                placeholder='Enter password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType='password'
                rightIcon={rightIcon}
                value={password}
                onChangeText={text => setPassword(String(text))}
                handlePasswordVisibility={handlePasswordVisibility}
            />
            <Text style={styles.title2}>{signupError}</Text>
            <Button
                onPress={onHandleSignup}
                backgroundColor='#f57c00'
                title='Signup'
                tileColor='#fff'
                titleSize={20}
                containerStyle={{
                    marginBottom: 24
                }}
            />
            <RNButton
                onPress={() => navigation.navigate('Login')}
                title='Go to Login'
                color='#000'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 12
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
        alignSelf: 'center',
        paddingBottom: 24
    },
    title2: {
        fontSize: 15
    }
});