//Import libraries for the alpaca API
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
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

      symbol: 0,
      qty: 0,
      market_val: 0,

      
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
          buying_power: parseFloat(response.data.buying_power).toFixed(2),
          long_market_value: parseFloat(response.data.long_market_value).toFixed(2),
          portfolio_value: parseFloat(response.data.portfolio_value).toFixed(2),
          cash: parseFloat(response.data.cash).toFixed(2),
          
        })

        // console.log(this)
      }
    })

    
    var sym
    var quant
    var market_value
    var pos_array = []

    // Get our positions
    api.getPositions().then((pos_response) => {

      console.log(pos_response.data)

      var myClonedArray = Object.assign([], pos_response.data);

      pos_array = Object.assign([], pos_response.data);
      
      // console.log(pos_array)
    
      pos_response.data.forEach(function (object) {
        // console.log(`${object.qty} shares of ${object.symbol}`)
        sym = object.symbol
        quant = object.qty
        market_value = parseFloat(object.market_value).toFixed(2)
      });

      this.setState({
        symbol: sym,
        qty: quant,
        market_val: market_value,
      })
    
    })    

    console.log(pos_array)

  }

  //Output data
  render() {
    return <View style={{flex: 1, flexDirection: 'column'}}>
      <Text style={styles.title}>Alpaca Account Info</Text>

      <View style={{flex: 1}}>
        <Text style={styles.container}>Buying Power</Text>
        <Text style={styles.cash}>${this.state.buying_power}</Text>
        <Text style={styles.container}>Cash</Text>
        <Text style={styles.cash}>${this.state.cash}</Text>
        <Text style={styles.container}>Long Market Value</Text>
        <Text style={styles.cash}>${this.state.long_market_value}</Text>
        <Text style={styles.container}>Portfolio Value</Text>
        <Text style={styles.cash}>${this.state.portfolio_value}</Text>
     </View>

     <View style={{flex: 2}}>
        <Text style={styles.title}>Orders</Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={styles.container}>Symbol:</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.container}>Shares:</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.container}>Market Value:</Text>
          </View>
        </View>
      <View style={{flex: 7, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text style={styles.order}>{this.state.symbol}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.order}>{this.state.qty}</Text>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.order}>${this.state.market_val}</Text>
        </View>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  cash: {
    color: 'green',
  },
  order: {
    color: 'grey',
  },
});
