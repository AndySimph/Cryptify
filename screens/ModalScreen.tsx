//Import libraries for the alpaca API
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet, FlatList } from 'react-native';
import alpacaApi from '../services/alpaca';
import { Text, View } from '../components/Themed';
import { greaterThan } from 'react-native-reanimated';

import apisauce from 'apisauce'
import config from '../config.js'

//Class for the screen
class ModalScreen extends React.Component {

  //Create the title
  static navigationOptions = {
    title: 'Dashboard'
  }

  //Create a constructor for the data
  constructor(props) {
    super(props)

    this.state = {
      buying_power: 0,
      cash: 0,
      long_market_value: 0,
      portfolio_value: 0,

      positions: []
    }

  }

  //Get the data from the API
  componentDidMount() {

    const api = alpacaApi()

    //Use the account to get account data
    api.getAccount().then((response) => {

      // console.log(response)

      //Check the response
      if (response.ok) {
        //Set the state of the account
        this.setState({
          buying_power: parseFloat(response.data.non_marginable_buying_power).toFixed(2),
          long_market_value: parseFloat(response.data.long_market_value).toFixed(2),
          portfolio_value: parseFloat(response.data.portfolio_value).toFixed(2),
          cash: parseFloat(response.data.cash).toFixed(2),

        })
      }
    })
    
    // Get our positions
    api.getPositions().then((pos_response) => {

      // console.log(pos_response.data)

      //Get the position data
      if (pos_response.ok) {
        this.setState({
          positions: pos_response.data
        })
      }
    })
  }

  //Function to render a row for positions
  renderRow = ({item}) => {
    //Get color of the profit gain or loss
    const profit_color = ((item.change_today * 100) > 0) ? 'green' : 'red';

    return (
      <View key={item.asset_id} style={styles.positions}>
        <View style={styles.positions_left}>
          <Text style={styles.symbol}>{item.symbol}</Text>
        </View>
        <View style={styles.positions_mid}>
          <Text>{item.qty}</Text>
          <Text style={styles.subheading}>${(item.avg_entry_price * 1).toFixed(2)}</Text>
        </View>
        <View style={styles.positions_right}>
          <Text style={[styles.price, { color: profit_color }]}>${item.current_price}</Text>
          <Text style={styles.subheading}>{(item.change_today * 100).toFixed(3)}</Text>
        </View>
      </View>
    )
  }

  //Output data
  render() {
    return <View style={{ flex: 1, flexDirection: 'column' }}>
      <Text style={styles.title}>Alpaca Account Info</Text>

      <View style={{ flex: 1 /*, borderWidth: 1, borderColor: 'red'*/ }}>
        <Text style={styles.container}>Buying Power</Text>
        <Text style={styles.cash}>${this.state.buying_power}</Text>
        <Text style={styles.container}>Cash</Text>
        <Text style={styles.cash}>${this.state.cash}</Text>
        <Text style={styles.container}>Long Market Value</Text>
        <Text style={styles.cash}>${this.state.long_market_value}</Text>
        <Text style={styles.container}>Portfolio Value</Text>
        <Text style={styles.cash}>${this.state.portfolio_value}</Text>
      </View>

      <View style={{ flex: 2.25 /*, borderWidth: 1, borderColor: 'blue'*/ }}>
        <Text style={styles.title}>Positions</Text>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.container}>Symbol:</Text>
          </View>
          
          <View style={{ flex: 1 }}>
            <Text style={styles.container}>Shares:</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.container}>Market Value:</Text>
          </View>
        </View>

        <View style={{ flex: 10, flexDirection: 'row' }}>
          <FlatList
            data = {this.state.positions}
            renderItem = {this.renderRow}
            keyExtractor = {item => item.asset_id}
          />

        </View>

      </View>

    </View>

  }
}

export default ModalScreen

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  cash: {
    color: 'green',
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
    flex: 2,
  },
  positions_right: {
    flex: 2,
  },
  positions_mid: {
    flex: 3,
  },
  symbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subheading: {
    color: '#808080'
  },
});
