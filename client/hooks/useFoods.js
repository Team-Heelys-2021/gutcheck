import * as React from 'react';
import axios from 'axios';
import 'regenerator-runtime/runtime';

export function useFoods() {
  const [foodsList, setFoodsList] = React.useState([]);

  const doFoodsSearch = async (text) => {
    const query = `${process.env.API_URL}/search?api_key=${process.env.API_KEY}&pageSize=50&query=${text}`;
    let foods = [];
    try {
      let { data } = await axios.get(query);
      setFoodsList(data.foods);
    } catch (e) {
      console.error(e);
    }
  };

  return { foodsList, doFoodsSearch };
}
