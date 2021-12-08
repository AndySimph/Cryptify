import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Text } from 'react-native';
import { IconButton } from '../components'
import { RootTabScreenProps } from '../types';
import Chart from '../components/data_chart'
import { View } from '../components/Themed';
import alpacaApi from '../services/alpaca';




export default function CoinScreen({ route, navigation }: RootTabScreenProps<'Coin'>) {
    const item_id = route.params;

    const [buyVis, setBuyVis] = useState(false);
    const [buyAmount, setBuyAmount] = useState('');
    const [sellVis, setSellVis] = useState(false);
    const [sellAmount, setSellAmount] = useState('');
    const onBuy = async () => {
        if (buyVis) {
            setBuyAmount("");
            setBuyVis(false);
            // call BUY function here
            const api = alpacaApi();
            // console.log((buyAmount / item_id.currentPrice).toFixed(4).toString());
            var data =
            {
                symbol: (item_id.symbol).toUpperCase() + "USD",
                qty: (buyAmount / item_id.currentPrice).toFixed(4).toString(),
                side: "buy",
                type: "market",
                time_in_force: "gtc"
            };
            console.log(data);
            api.postOrders(data).then((response) => {
                response
                console.log(response.ok)
            })
        }
    };
    const onSell = async () => {
        if (sellVis) {
            setSellAmount("");
            setSellVis(false);
            // call BUY function here
            const api = alpacaApi();
            var data =
            {
                symbol: (item_id.symbol).toUpperCase() + "USD",
                qty: (sellAmount / item_id.currentPrice).toFixed(4).toString(),
                side: "sell",
                type: "market",
                time_in_force: "gtc"
            };
            console.log(data);
            api.postOrders(data).then((response) => {
                response
                console.log(response)
            })
        }
    };





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
                        value={buyAmount}
                        onChangeText={text => {
                            var vis = text != "";
                            setBuyVis(vis);
                            setBuyAmount(String(text));
                        }}
                    />
                    <IconButton
                        name='checkcircleo'
                        size={32}
                        color={buyVis ? '#00FF00' : '#FFFFFF'}
                        onPress={onBuy}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>
                        Sell
                    </Text>
                    <Text style={styles.textD}>
                        $
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        keyboardType='numeric'
                        placeholder="0.00"
                        value={sellAmount}
                        onChangeText={text => {
                            var vis = text != "";
                            setSellVis(vis);
                            setSellAmount(String(text));
                        }}
                    />
                    <IconButton
                        name='checkcircleo'
                        size={32}
                        color={sellVis ? '#FF0000' : '#FFFFFF'}
                        onPress={onSell}
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
