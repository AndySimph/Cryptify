//Import libraries for the expore screen
//import * as React from 'react';
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import coinGeckoApi from '../services/coingecko';
import ListItem from '../components/ListCoins';

//Function to get set the explore screen
export default function ExploreScreen({ navigation }: RootTabScreenProps<'Explore'>) {
  //Declare the api used
  const api = coinGeckoApi()

  //Declare data
  const [data, setData] = useState([]);

  //Get data
  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await api.getMarketData();

      setData(marketData);
    }

    fetchMarketData();
  }, [])

  const openModal = (item) => {

    navigation.navigate('Coin', {
      currentPrice: item.current_price,
      logoUrl: item.image,
      name: item.name,
      symbol: item.symbol,
      priceChangePercentage7d: item.price_change_percentage_7d_in_currency,
      sparkline: item?.sparkline_in_7d.price,
    });
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

