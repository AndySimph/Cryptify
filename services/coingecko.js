//Libraries for coingecko
//Install axios and moment using yarn
import axios from 'axios';
import moment from 'moment';

//Format the sparkline
const formatSparkline = (numbers) => {
  const pastWeek = moment().subtract(7, 'days').unix();

  let formattedSparkline = numbers.map((item, index) => {
    return {
      x: pastWeek + (index + 1) * 3600,
      y: item,
    }
  })

  return formattedSparkline;
}

//Format the data
const formatMarketData = (data) => {
  let formattedData = [];

  data.forEach(item => {
    const formattedSparkline = formatSparkline(item.sparkline_in_7d.price)

    const formattedItem = {
      ...item,
      sparkline_in_7d: {
        price: formattedSparkline
      }
    }

    formattedData.push(formattedItem);
  });

  return formattedData;
}

//Get the data
export const getMarketData = async () => {
  try {
    //api call using requested link
    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d");

    const data = response.data;

    const formattedResponse = formatMarketData(data);

    return formattedResponse;

  } catch (error) {
    console.log(error.message);
  }
}