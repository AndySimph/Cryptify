//Import libraries for the alpaca API
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet, FlatList } from 'react-native';
import alpacaApi from '../services/alpaca';
import { Text, View } from '../components/Themed';
import { greaterThan } from 'react-native-reanimated';

import apisauce from 'apisauce'
import config from '../config.js'

class FollowingScreen extends React.Component {

    static navigationOptions = {
        title: 'Account History'
    }

    constructor(props) {
        super(props)

        this.state = {
            activities: []
        }
    }

    componentDidMount() {
        const api = alpacaApi()

        api.getActivities().then((response) => {
            if (response.ok) {
                console.log(response)

                this.setState({
                    activities: response.data
                })
            }
        })

    }

    //Function to render a row for activities
    renderRow = ({item}) => {
        // console.log(item.id)
        const transaction_color = (item.side == 'buy') ? 'blue' : 'orange';

        return (
            <View key={item.id} style={[styles.positions, { borderColor: transaction_color }]}>
                <View style={styles.positions_left}>
                    <Text style={styles.symbol}>{item.symbol}</Text>
                    <Text style={styles.subheading}>{(item.transaction_time).substring(0,10)}</Text>
                </View>
                
                <View style={styles.positions_mid}>
                    <Text>{item.qty}</Text>
                    <Text style={styles.subheading}>{(item.side).charAt(0).toUpperCase() + (item.side).slice(1)}</Text>
                </View>

                <View style={styles.positions_right}>
                    <Text style={styles.price}>${((item.price) * (item.qty)).toFixed(2)}</Text>
                    <Text style={styles.subheading}>${(item.price)}</Text>
                </View>
                
            </View>
        )
    }

    render() {

        return <View style={{ flex: 1, flexDirection: 'column' }}>
            {/* <Text style={styles.title}>Alpaca Account History</Text> */}

            <View style={{ flex: 1, flexDirection: 'row', padding: 5 }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Symbol:</Text>
                    <Text style={styles.subheading}>Date:</Text>
                </View>
                
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Shares:</Text>
                    <Text style={styles.subheading}>Transaction Type:</Text>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Transaction Price:</Text>
                </View>
            </View>


            <View style={{ flex: 10 }}>
                <FlatList
                    data = {this.state.activities}
                    renderItem = {this.renderRow}
                    keyExtractor = {item => item.id}
                />
            </View>

        </View>
    }
}

export default FollowingScreen

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
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },  
    positions: {
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        borderWidth: 1,
        padding: 5,
        borderRadius: 10,
      },
      positions_left: {
        flex: 1,
      },
      positions_right: {
        flex: 1,
      },
      positions_mid: {
        flex: 1,
      },
      symbol: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
      },
      price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green'
      },
      subheading: {
        color: '#808080'
      },
});
