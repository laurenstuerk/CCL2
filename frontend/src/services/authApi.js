import axios from 'axios';
import { toast } from 'sonner';

const BASE_URL = 'http://localhost:3000/api';
// `${BASE_URL}/...`


// export const login = async (email, password) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/auth/login`, {
//       email,
//       password,
//     });
//     return response.data;
//   } catch (err) {
//     throw new Error(err.response?.data?.message || 'Login failed');
//   }
// };

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    // Store token and user info
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.user.role);
    localStorage.setItem("userId", response.data.user.id);
    toast.success('Login successful!');
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Login failed');
  }
};


// Create new User
export const register = async ( userData) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error('Failed to create new user');
    }
    return await response.json(); // Return the newly created user
}