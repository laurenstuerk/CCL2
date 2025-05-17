const BASE_URL = 'http://localhost:3000/api';
// `${BASE_URL}/...`


export const login = async (email, password) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }

    return await response.json(); // Return login response (should contain token)
};

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

// Create new User
export const createUser = async (token, userData) => {
    const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error('Failed to create new user');
    }
    return await response.json(); // Return the newly created user
}

// Update new User
export const updateUser = async (token, id, userData) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
    });
    console.log(token, id, userData)
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
