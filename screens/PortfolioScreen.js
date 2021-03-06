//Import libraries for the alpaca API
import * as React from 'react';
import { StyleSheet, FlatList, Image } from 'react-native';
import alpacaApi from '../services/alpaca';
import { Text, View } from '../components/Themed';
import coinGeckoApi from '../services/coingecko';
import ListItem from '../components/ListCoins';

console.log("----------------------------------------------")

//Class for the screen
class PortfolioScreen extends React.Component {

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

      positions: [],
    }

  }

  //Get the data from the API
  componentDidMount() {

    //Declare the api used
    const api = alpacaApi()

    //Use the account to get account data
    api.getAccount().then((response) => {

        //console.log(response)

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
  renderRow = ({ item }) => {
    //Get color of the profit gain or loss
    const profit_color = ((item.change_today * 100) > 0) ? 'green' : 'red';

    //Declare the api and coin name
    const coinapi = coinGeckoApi()
    coin_name = "error"

    //Alpaca currently only has 4 different types of crypto available for trading
    //ETH, BTC, BCH, and LTC
    if (item.symbol == 'ETHUSD') {
      coin_name = 'ethereum'
    } else if (item.symbol == 'BTCUSD') {
      coin_name = 'bitcoin'
    } else if (item.symbol == 'LTCUSD') {
      coin_name = 'litecoin'
    } else if (item.symbol == 'BCHUSD') {
      coin_name = 'bitcoincash'
    } 

    //Get the image for the coin
    if (coin_name != "error") {
      //Call the api and created function
      coinapi.getCoinData(coin_name).then((coinData) => {
        if (coinData) {
          item.here = coinData.image.large
        }
      })
    }

    return (
      //Set up output by asset id
      <View key={item.asset_id} style={styles.positions}>
        <View style={{ flex: 1 }}>
          <Text style={styles.symbol}>{item.symbol}</Text>
          <Image source={item.here ? {uri: item.here } : null} style={styles.image} />
        </View>
        <View style={{ flex: 1 }}>
          <Text>{item.qty}</Text>
          <Text style={styles.subheading}>${(item.avg_entry_price * 1).toFixed(2)}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.price, { color: profit_color }]}>${(item.current_price * item.qty).toFixed(2)}</Text>
          <Text style={styles.subheading}>{(item.change_today * 100).toFixed(3)}</Text>
        </View>
      </View>
    )
  }

  //Output data
  render() {
    if (0 < 1) {
      // console.log("Here")
    }
    return <View style={{ flex: 1, flexDirection: 'column' }}>

      <View style={{ flex: .45, padding: 5, flexDirection: 'row', backgroundColor: '#F2F2F2' }}>
        
        <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#F2F2F2' }}>
          <Text style={styles.container}>Buying Power</Text>
          <Text style={styles.cash}>${this.state.buying_power}</Text>
          <Text style={styles.container}>Cash</Text>
          <Text style={styles.cash}>${this.state.cash}</Text>
        </View>

        <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#F2F2F2' }}>
          <Text style={styles.container}>Long Market Value</Text>
          <Text style={styles.cash}>${this.state.long_market_value}</Text>
          <Text style={styles.container}>Portfolio Value</Text>
          <Text style={styles.cash}>${this.state.portfolio_value}</Text>
        </View>
      </View>

      <View style={{ flex: 2.5, padding: 5, backgroundColor: '#F2F2F2' }}>
      
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
            <Text style={styles.container}>Symbol:</Text>
          </View>
          
          <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
            <Text style={styles.container}>Shares:</Text>
            <Text style={styles.subheading}>Price Bought @:</Text>
          </View>

          <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
            <Text style={styles.container}>Market Value:</Text>
            <Text style={styles.subheading}>Value Change:</Text>
          </View>
        </View>

        <View style={{ flex: 10, flexDirection: 'row', backgroundColor: '#F2F2F2' }}>
          <FlatList
            keyExtractor = {item => item.asset_id}
            data = {this.state.positions}
            renderItem = {this.renderRow}
            // renderItem={({ item }) => (

            //   //Set the properties in the item
            //   <ListItem
            //     name={item.symbol}
            //     symbol={item.symbol}
            //     currentPrice={item.current_price}
            //     priceChangePercentage7d={(item.change_today * 100)}
            //     logoUrl="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
            //     // onPress={() => "console.log('You clicked submit.')}
            //   />
            // )}
          />

        </View>

      </View>

    </View>

  }
}

export default PortfolioScreen

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    padding: 5,
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
    color: '#808080',
  },
  image: {
    height: 48,
    width: 48,
  },
});
