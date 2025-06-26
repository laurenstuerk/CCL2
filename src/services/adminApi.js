import api from '../lib/axios';

export const fetchUsers = async (options = {}) => {
  const { 
    page = 1, 
    limit = 10, 
    sortBy = 'id', 
    order = 'desc', 
    search = '' 
  } = options;

  try {
    const response = await api.get('/admin/users', {
      params: { page, limit, sortBy, order, search }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Fehler beim Laden der Benutzer.');
  }
};

export const fetchGameHistory = async (options = {}) => {
  try {
    // Wir übergeben alle Optionen als Query-Parameter
    const response = await api.get('/admin/game-history', { params: options });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Fehler beim Laden des Spielverlaufs.');
  }
};

export const deleteGameHistoryEntry = async (id) => {
  try {
    const response = await api.delete(`/admin/game-history/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Fehler beim Löschen des Eintrags.');
  }
};

export const fetchGeneralStats = async () => {
  const response = await api.get('/admin/stats/general');
  return response.data;
}

export const updateUser = async (data) => {
  const { userId, userData } = data;
  const response = await api.put(`/admin/users/${userId}`, userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/admin/users/${userId}`);
  return response.data;
};