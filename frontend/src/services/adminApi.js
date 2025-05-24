const BASE_URL = 'http://localhost:3000/api';
// `${BASE_URL}/...`
import axios from 'axios';

//Fetch all User
export const getAllUsers = async (token) => {
    const response = await fetch(`${BASE_URL}/users`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    return data; // Return users data
};