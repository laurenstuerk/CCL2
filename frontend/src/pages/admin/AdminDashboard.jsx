import { useEffect, useState } from "react";
import { getAllUsers } from '../../services/adminApi.js';
import { getToken } from "../../utils/auth";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const token = getToken();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers(token);
        setUsers(allUsers);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">ID</th>
            <th className="border-b p-2">Username</th>
            <th className="border-b p-2">Email</th>
            <th className="border-b p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border-b p-2">{u.id}</td>
              <td className="border-b p-2">{u.username}</td>
              <td className="border-b p-2">{u.email}</td>
              <td className="border-b p-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
