import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { IconButton, InputField } from '../components'
import { RootTabScreenProps } from '../types';
import ExploreScreen from './ExploreScreen';
import Chart from '../components/data_chart'
import { View } from '../components/Themed';



export default function CoinScreen({ route, navigation }: RootTabScreenProps<'Coin'>) {
    const [buyvis, setBuyVis] = useState(false);
    const [amount, setAmount] = useState('');
    var vis = false;
    const onBuy = async () => {
        if (vis) {
            console.log("$" + amount);
            setAmount("");
            //call BUY function here
        }
    };

    const item_id = route.params;
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView>
                <Chart
                    currentPrice={item_id.currentPrice}
                    logoUrl={item_id.image}
                    name={item_id.name}
                    symbol={item_id.symbol}
                    priceChangePercentage7d={item_id.priceChangePercentage7d}
                    sparkline={item_id.sparkline}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>
                        Buy
                    </Text>
                    <Text style={styles.textD}>
                        $
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='numeric'
                        placeholder="0.00"
                        value={amount}
                        onChangeText={text => {
                            vis = text != "";
                            setBuyVis(vis);
                            setAmount(String(text));
                        }}
                    />
                    <IconButton
                        name='pluscircleo'
                        size={32}
                        color={buyvis ? '#000' : '#FFFFFF'}
                        onPress={onBuy}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
    },
    text: {
        fontSize: 25,
        marginLeft: 20,
        margin: 10
    },
    textD: {
        fontSize: 25,
        marginRight: 2,
        margin: 12
    },
    textInput: {
        height: 40,
        width: 200,
        margin: 10,
        marginLeft: 0,
        // borderWidth: .5,
        fontSize: 20

        // borderBottomColor: '#000000',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
