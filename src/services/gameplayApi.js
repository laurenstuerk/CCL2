// src/services/gameApi.js
import api from "../lib/axios";

export const submitGameResult = async ({ gameSlug, time, xp }) => {
  try {
    // We send the result data in the request body.
    // console.log("Submitting game result:", { gameSlug, time, xp });
    const response = await api.post(`/gameplay/submitGameResult`, { 
        game_slug: gameSlug,
        time_ms: time, 
        xp: xp 
    });
    return response.data;
  } catch (error) {
    // Re-throw the error for useMutation to handle
    throw error.response?.data || new Error("An unknown error occurred.");
  }
};


