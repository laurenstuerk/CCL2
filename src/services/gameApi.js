// src/services/gameApi.js
import api from '../lib/axios';

export const getGameBySlug = async (slug) => {
  try {
    const response = await api.get(`/games/${slug}`);
    // Axios puts the JSON response automatically in the .data field
    return response.data;
  } catch (error) {
    // throw the error so that React Query can catch and handle it
    // We use the error message from the backend if available
    throw new Error(error.response?.data?.message || 'Error occurred at getGameBySlug.');
  }
};

export const postReview = async ({ slug, rating, text }) => {
  try {
    const response = await api.post(`/games/${slug}/reviews`, { rating, text });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error occurred while submitting review.');
  }
};

export const getAllGames = async () => {
    try {
        const response = await api.get('/games');
        return response.data;
    } catch (error) {
        // The error will be caught by TanStack Query
        throw error;
    }
};

export const getGameNavList = async () => {
  console.log('Fetching game navigation list...');
    try {
      console.log('Fetching game navigation list...');
        const response = await api.get('/games/navlist');
        console.log('Game navigation list:');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getGlobalLeaderboard = async () => {
  console.log('Fetching for the getGlobalLeaderboard');
    try {
        const response = await api.get('/games/leaderboard/global');
        console.log('getGlobalLeaderboard arrived');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getGameLeaderboard = async (slug) => {
  console.log('Fetching for the getGameLeaderboard');
    try {
    const response = await api.get(`/games/leaderboard/${slug}/`);
        console.log('getGameLeaderboard arrived');
        return response.data;
    } catch (error) {
        throw error;
    }
};
