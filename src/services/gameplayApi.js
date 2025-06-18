// src/services/gameApi.js
import { toast } from "sonner";
import api from "../lib/axios";

export const submitGameResult = async ({ gameSlug, time, xp }) => {
  try {
    // We send the result data in the request body.
    console.log("Submitting game result:", { gameSlug, time, xp });
    const response = await api.post(`/gameplay/submitGameResult`, { 
        game_slug: gameSlug,
        time_ms: time, 
        xp: xp 
    });
    console.log(xp, time_ms, gameSlug, response.data);
    return response.data;
  } catch (error) {
    // Re-throw the error for useMutation to handle
    throw error.response?.data || new Error("An unknown error occurred.");
  }
};


