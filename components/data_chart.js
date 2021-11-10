import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native'
import {ChartDot, ChartPath, ChartPathProvider, ChartYLabel} from '@rainbow-me/animated-charts';
import { useSharedValue } from 'react-native-reanimated';

const { width: SIZE } = Dimensions.get('window');


const Chart = ({ currentPrice, logoUrl, name, symbol, priceChangePercentage7d, sparkline }) => {
  const latestCurrentPrice = useSharedValue(currentPrice);
  const [chartReady, setChartReady] = useState(false);

  const priceChangeColor = priceChangePercentage7d > 0 ? '#34C759' : '#FF3B30';

  useEffect(() => {
    latestCurrentPrice.value = currentPrice;

    setTimeout(() => {
      setChartReady(true);
    }, 0)

  }, [currentPrice])

  const formatUSD = value => {
    'worklet';
    if (value === '') {
      const formattedValue = `$${latestCurrentPrice.value.toLocaleString('en-US', { currency: 'USD' })}`
      return formattedValue;
    }

    const formattedValue =`$${parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
    return formattedValue;
  };

  if (sparkline.length === 0) {
    return <Text>Loading...</Text>
  }

  return (
    <ChartPathProvider data={{ points: sparkline, smoothingStrategy: 'bezier' }}>
      <View style={styles.chartWrapper}>

        {/* Titles */}
        <View style={styles.titlesWrapper}>
          <View style={styles.upperTitles}>
            <View style={styles.upperLeftTitle}>
              <Image source={{ uri: logoUrl }} style={styles.image} />
              <Text style={styles.subtitle}>{name} ({symbol.toUpperCase()})</Text>
            </View>
            <Text style={styles.subtitle}>Past 7 Days:</Text>
          </View>
          <View style={styles.lowerTitles}>
            <ChartYLabel
              format={formatUSD}
              style={styles.boldTitle}
            />
            <Text style={[styles.title, {color: priceChangeColor}]}>{priceChangePercentage7d.toFixed(2)}%</Text>
          </View>
        </View>

        { chartReady ?
        (<View style={styles.chartLineWrapper}>
          <ChartPath height={SIZE / 2} stroke="white" width={SIZE} />
          <ChartDot style={{ backgroundColor: 'white' }} />
          </View>)

          :

          null
        
        }
        
      </View>
    </ChartPathProvider>
  )
}

const styles = StyleSheet.create({
  chartWrapper: {
    marginVertical: 16
  },
  titlesWrapper: {
    marginHorizontal: 16
  },
  upperTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#A9ABB1',
  },
  upperLeftTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#A9ABB1',
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#A9ABB1',
  },
  lowerTitles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boldTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A9ABB1',
  },
  title: {
    fontSize: 18,
    color: '#A9ABB1',
  },
  chartLineWrapper: {
    marginTop: 40,
  },
});

export default Chart