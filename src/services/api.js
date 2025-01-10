import axios from 'axios';

const API_URL = 'https://api.unsplash.com/search/photos';
// const ACCESS_KEY = import.meta.env.VITE_API_KEY;

export const fetchImages = async (query, page = 1, perPage = 12) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        query,
        page,
        per_page: perPage,
      },
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_ACCESS_KEY}`,
      },
    });

    return response.data; 
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch images');
  }
};


