//Import libraries for the expore screen
//import * as React from 'react';
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { getMarketData } from '../services/coingecko';
import ListItem from '../components/ListCoins';
//Function to get set the explore screen
export default function ExploreScreen({ navigation }: RootTabScreenProps<'Explore'>) {

  //Declare data
  const [data, setData] = useState([]);

  //Get data
  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();

      setData(marketData);
    }

    fetchMarketData();
  }, [])

  const openModal = (item) => {

    navigation.navigate('Coin', item.name);
  }


  return (
    //Create the list
    <FlatList
      //Set the variables and data
      keyExtractor={(item) => item.id}
      data={data}
      renderItem={({ item }) => (

        //Set the properties in the item
        <ListItem
          name={item.name}
          symbol={item.symbol}
          currentPrice={item.current_price}
          priceChangePercentage7d={item.price_change_percentage_7d_in_currency}
          logoUrl={item.image}
          onPress={() => openModal(item)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleWrapper: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A9ABB1',
    marginHorizontal: 16,
    marginTop: 16,
  },
});
