import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../api/userApi';

export function useUserDelete({ onSuccess } = {}) {
    const navigate = useNavigate();

    const handleDelete = async (id) => {

        const token = localStorage.getItem('token');

        try {
            await deleteUser(token, id);
            if (onSuccess) {
                onSuccess(id);
            } else {
                // Default: navigate back to /users
                navigate('/users');
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
            if (error.status === 401 || error.status === 403) {
                navigate('/login');
            }
        }
    };

    return handleDelete;
}
