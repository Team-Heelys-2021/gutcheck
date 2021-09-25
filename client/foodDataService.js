import axios from 'axios'
import 'regenerator-runtime/runtime'

export const searchFoods = async (text) => {
  const query = `${process.env.API_URL}/search?api_key=${process.env.API_KEY}&pageSize=50&query=${text}`
  let foods = []
  try {
    let { data } = await axios.get(query)
    foods = data.foods
  } catch(e) {
    console.error(e)
  }
  return foods
}