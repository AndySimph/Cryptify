import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ExploreScreen from './ExploreScreen';
import Chart from '../components/data_chart'

export default function CoinScreen({ route, navigation }: RootTabScreenProps<'Coin'>) {
    const item_id = route.params;
    return (
        // <View style={styles.container}>
        //     <Text style={styles.title}></Text>
        //     <Text>{item_id.name}</Text>
        //     <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        // </View >
        
        <Chart
            currentPrice={item_id.currentPrice}
            logoUrl={item_id.image}
            name={item_id.name}
            symbol={item_id.symbol}
            priceChangePercentage7d={item_id.priceChangePercentage7d}
            sparkline={item_id.sparkline}
        />
            
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
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
