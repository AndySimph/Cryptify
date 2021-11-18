import * as React from 'react'
import { useContext } from 'react'
import { StyleSheet, Pressable } from 'react-native'

import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import Firebase from '../services/firebase'
import { IconButton, Button } from '../components'
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider'

const auth = Firebase.auth();

export default function PortfolioScreen() {
    const { user } = useContext(AuthenticatedUserContext);
    const handleSignOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.log(error)
        }
    };
    const uid = user.uid;
    const incBalance = async() => {
        Firebase.database().ref('users/').push({
            balance: 1000
        });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title2}>{user.email}</Text>
            <Text style={styles.title}>Portfolio</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <IconButton
                onPress={handleSignOut}
                name='logout'
                size={24}
                color='#000'
            />
            <Button
                onPress={incBalance}
                backgroundColor='#bcbcbc'
                title='Increase'
                titleColor='#000'
                titleSize={20}
                containerStyle={{
                    marginBottom: 24
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    title2: {
        fontSize: 15,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
})
