//services/userApi.js

import api from '../lib/axios'; // Importiere unsere zentrale axios-Instanz

/**
 * Holt einen Benutzer anhand seiner ID.
 * Das Auth-Token wird automatisch vom axios-Interceptor hinzugefügt.
 */
// export const getUserById = async (id) => {
//   try {
//     const response = await api.get(`/users/${id}`);
//     return response.data; // Axios gibt die Daten direkt im .data-Feld zurück
//   } catch (error) {
//     // Wirf den Fehler weiter, damit die aufrufende Komponente ihn behandeln kann
//     throw error;
//   }
// };

/**
 * Aktualisiert die Daten eines Benutzers.
 */
export const updateUser = async (userData) => {
  console.log("Updating user with data:", userData);
  try {
    const response = await api.put('/users/update', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Holt einen Benutzer anhand seines Benutzernamens.
 */
export const getMe = async () => {
  try {
    const response = await api.get(`/users/me`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


/**
 * Lädt ein neues Profilbild hoch.
 */
export const uploadProfilePicture = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile); // Der Key "image" muss mit dem Backend übereinstimmen

  try {
    // Axios erkennt FormData und setzt den 'Content-Type'-Header automatisch auf 'multipart/form-data'.
    const response = await api.post("/users/upload", formData);
    return response.data; // gibt { imageUrl } zurück
  } catch (error) {
    throw error;
  }
};

export const updateUserPassword = async (passwords) => {
  // passwords is a object like: { currentPassword, newPassword }
  const response = await api.put('/users/password', passwords);
  return response.data;
};

export const toggleMfa = async ({ enable, password }) => {
  const response = await api.post('/users/mfa/toggle', { enable, password });
  return response.data;
};

export const deleteAccount = async ({ password }) => {
  // for deleting the account, we need to send the password for confirmation
  const response = await api.delete('/users/delete', { data: { password } });
  return response.data;
};

export const getPublicUserByUsername = async (username) => {
  try {
    // The username is passed in the URL, and the auth token is handled by the interceptor.
    const response = await api.get(`/users/public/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

