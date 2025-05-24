const BASE_URL = 'http://localhost:3000/api';
// `${BASE_URL}/...`
import axios from 'axios';


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

// get user by id
export const getUserById = async (token, id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch user (Id)');
    }

    return await response.json(); // Return user data
};



// Update User
export const updateUser = async (token, id, userData) => {
    console.log(token, id, userData)
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error('Failed to update user');
    }
}



// Delete new User
export const deleteUser = async (token, id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Create user failed');
    }
    return true;
};

// Get user by username
export const getUserByUsername = async (token, username) => {
    const response = await fetch(`${BASE_URL}/users/${username}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch user (Username)');
    }

    return await response.json(); // Return user data
};

export const getPublicUserByUsername = async (token, username) => {
    const response = await fetch(`${BASE_URL}/users/public/${username}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch user public');
    }
    return await response.json();
};

export const uploadProfilePicture = async (token, imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`${BASE_URL}/users/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  return await response.json(); // returns { imageUrl }
};