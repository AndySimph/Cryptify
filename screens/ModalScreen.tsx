//Import libraries for the alpaca API
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import alpacaApi from '../services/alpaca';
import { Text, View } from '../components/Themed';

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
      }
  }

  //Get the data from the API
  componentDidMount() {
      console.log('fetch data from alpaca')

      const api = alpacaApi()

      //Use the account to get account data
      api.getAccount().then((response) => {
          console.log(response)

          if (response.ok) {
              this.setState({
                  buying_power: response.data.buying_power,
                  long_market_value: response.data.long_market_value,
                  portfolio_value: response.data.portfolio_value,
                  cash: response.data.cash
              })
          }
      })
  }

  //Output data
  render() {
      return <View>
          <Text style={styles.title}>Dashboard Screen</Text>

          <View style={styles.separator}>
              <Text style={styles.container}>Buying Power</Text>
              <Text>{this.state.buying_power}</Text>
              <Text>Cash</Text>
              <Text>{this.state.cash}</Text>
              <Text>Long Market Value</Text>
              <Text>{this.state.long_market_value}</Text>
              <Text>Portfolio Value</Text>
              <Text>{this.state.portfolio_value}</Text>
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
});
