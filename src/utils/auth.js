
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


export function getUserIdFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const payload = token.split('.')[1];
  try {
    const decoded = JSON.parse(atob(payload));
    return decoded.id;
  } catch (err) {
    return null;
  }
}


export function getUserRoleFromStorage() {
  return localStorage.getItem("role");
};

export const isAdmin = () => {
  return getUserRoleFromStorage() === "admin";
};
 
export function getToken() {
  return localStorage.getItem("token");
}



//what is better to store only the token or individal values in local storage