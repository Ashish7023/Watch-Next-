export const API_KEY = 'e6b8c5300681adf1ff4ca55b9854193c';
export const BASE_URL = 'https://api.themoviedb.org/3';

import axios from 'axios';

export const API_CALL = async (endpoint, params) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const data = await axios.request(options);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const IMAGE_URL = 'https://image.tmdb.org/t/p';
