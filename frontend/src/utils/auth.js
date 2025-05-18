
export function getUsernameFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const payload = token.split('.')[1];
  try {
    const decoded = JSON.parse(atob(payload));
    return decoded.username;
  } catch (err) {
    return null;
  }
}
