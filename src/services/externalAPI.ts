import axios from 'axios';
export const fetchExternalData = async () => {
  try {
    const { data } = await axios.get(process.env.EXTERNAL_API_URL!);
    return data;
  } catch (error) {
    console.error('Error fetching external data:', error);
    throw new Error('Error fetching external data');
  }
};
