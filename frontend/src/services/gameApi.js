// src/services/gameApi.js
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

const submitRaceTime = async ({ user_id, time }) => {
    console.log('Submitting race time:', { user_id, time });
  const response = await axios.post(`${BASE_URL}/game/marble`, {
    user_id,
    time,
  });
  return response.data;
};

export const SubmitRaceTime = () => {
  return useMutation({ mutationFn: submitRaceTime });
};
