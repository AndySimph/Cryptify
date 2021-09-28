import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';

import alpacaApi from '../services/alpaca';

import { Text, View } from '../components/Themed';

// export default function ModalScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Modal</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="/screens/ModalScreen.tsx" />

//       {/* Use a light status bar on iOS to account for the black space above the modal */}
//       <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
//     </View>
//   );
// }

class ModalScreen extends React.Component {

  static navigationOptions = {
      title: 'Dashboard'
  }

  constructor(props) {
      super(props)

      this.state = {
          buying_power: 0,
          cash: 0,
          long_market_value: 0,
          portfolio_value: 0,
      }
  }

  componentDidMount() {
      console.log('fetch data from alpaca')

      const api = alpacaApi()

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

  render() {
      return <View>
          <Text>Dashboard Screen</Text>

          <View>
              <Text>Buying Power</Text>
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
});
