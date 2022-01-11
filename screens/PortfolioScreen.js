//Import libraries for the alpaca API
import * as React from 'react';
import { StyleSheet, FlatList, Image } from 'react-native';
import alpacaApi from '../services/alpaca';
import { Text, View } from '../components/Themed';
import coinGeckoApi from '../services/coingecko';
import ListItem from '../components/ListCoins';

//Global variable to hold the link to the image
var image_link = ""
var temp = []
var image_ctr = -1
var key_id = []
var image_temp = ""

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
      pic: "",
    }

  }

  //Get the data from the API
  componentDidMount() {

    //Declare the api used
    const coinapi = coinGeckoApi()
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
          for ( var i = 0; i < pos_response.data.length; i++) {
            var coin_name = "error"

            //Alpaca currently only has 4 different types of crypto available for trading
            //ETH, BTC, BCH, and LTC
            if (pos_response.data[i].symbol == 'ETHUSD') {
              coin_name = 'ethereum'
            } else if (pos_response.data[i].symbol == 'BTCUSD') {
              coin_name = 'bitcoin'
            } else if (pos_response.data[i].symbol == 'LTCUSD') {
              coin_name = 'litecoin'
            } else if (pos_response.data[i].symbol == 'BCHUSD') {
              coin_name = 'bitcoincash'
            } 

            if (coin_name != "error") {
              coinapi.getCoinImage(coin_name).then((coinData) => {
                if (coinData) {
                  // pos_response.data[i].img_link = "here"
                  // image_link = coinData.image.large
                  // this.setState({
                  //   pic: coinData.image.large
                  // })
                  this.setState({
                    pic: coinData
                  })
                  // console.log(this.state)
                }
              })
              // console.log(this.state)
              // console.log(coin_name)
              // coinapi.getCoinData(coin_name).then((coinData) => {
              //   if (coinData) {
              //     // pos_response.data[i].img_link = "here"
              //     image_link = coinData.image.large
              //     this.setState({
              //       pic: coinData.image.large
              //     })
              //   }
              //   // console.log(this.state)
              // })
              // console.log(this.state)

              // console.log(temp)
              // console.log(image_link)
              // console.log(pos_response.data[i])

            }
            // pos_response.data[i].img_link = this.state.pic
            

          }
          // console.log(this.state)
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

    const coinapi = coinGeckoApi()
    // // console.log(key_id)
    // if (!(key_id.includes(item.asset_id))) {
    //   key_id.push(item.asset_id)
    //   image_ctr += 1
    // }
    // for (var i = 0; i < this.state.positions.length; i++) {
    //   this.state.positions[i].here = "yes"
    // }

    coin_name = "error"

    // //Alpaca currently only has 4 different types of crypto available for trading
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

    // // console.log(coin_name)
    
    if (coin_name != "error") {
      // console.log(coin_name)
      coinapi.getCoinData(coin_name).then((coinData) => {
        if (coinData) {
          // console.log(coinData.image.large)
          // image_link = coinData.image.large
          // if (!temp.includes(image_link)) {
          //   temp.push(coinData.image.large)
          // }
          item.here = coinData.image.large
        }
      })
    }

    // console.log(item)
    // console.log(image_link)
    // console.log(image_ctr)
    // console.log(temp)
    // console.log(temp[image_ctr])

    return (
      <View key={item.asset_id} style={styles.positions}>
        {/* {console.log(item.asset_id)} */}
        
        <View style={{ flex: 1 }}>
          <Text style={styles.symbol}>{item.symbol}</Text>
          {/* <Image source={image_link ? {uri: image_link } : null} style={styles.image} /> */}
          <Image source={item.here ? {uri: item.here } : null} style={styles.image} />
          {/* <Image source={temp[image_ctr] ? {uri: temp[image_ctr] } : null} style={styles.image} /> */}
          {/* <Image source={temp[image_ctr] ? {uri: temp[image_ctr] } : null} style={styles.image} /> */}

          {/* {image_ctr += 1} */}
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
