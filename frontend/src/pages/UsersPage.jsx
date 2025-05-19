import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import * as apiService from '../services/userApi.js'
import {useUserDelete} from '../hooks/useUserDelete.js';
import ConfirmationModal from '../components/OTP.jsx';


export default function UsersPage() {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    // State to control the confirmation modal visibility and target user
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [userToDeleteId, setUserToDeleteId] = useState(null);

    // Get the executeDelete function from the hook
    // This function will be passed to the modal as the 'onConfirm' callback
    const executeDelete = useUserDelete({
        onSuccess: (id) => {
            // This onSuccess callback runs after successful deletion via executeDelete
            setUsers(prev => prev.filter(user => user.id !== id));
            // The modal is closed within ConfirmationModal's handleConfirm,
            // or you could close it here if preferred after the delete success
            // closeConfirmationModal(); // Option 1: Close after success
        }
    });

    const fetchUsers = async () => {
        setIsLoading(true)
        setError('')
        const token = localStorage.getItem("token");
        try {
            const data = await apiService.getAllUsers(token)
            setUsers(data)
        } catch (error) {
            setError(error.message)
            // It's better to check for error.response.status if using axios,
            // but checking error.status might work depending on how your apiService throws errors.
            // A more robust check might involve looking at the error object structure.
            if (error.status === 401 || error.status === 403 || (error.response && (error.response.status === 401 || error.response.status === 403))) {
                navigate('/login') // Redirect to login if not authenticated
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    // Function to open the modal - used by the delete button
    const openConfirmationModal = (id) => {
        setUserToDeleteId(id);
        setShowConfirmationModal(true);
    };

    // Function to close the modal - passed as onClose prop to ConfirmationModal
    const closeConfirmationModal = () => {
        setShowConfirmationModal(false);
        setUserToDeleteId(null); // Reset userToDeleteId when closed
    };

    // This function is called by the ConfirmationModal when confirmed
    const handleModalConfirm = (id) => {
        // We don't need to check the passcode here, the modal already did it.
        // Just execute the delete action using the hook's function.
        // executeDelete handles showing alerts/navigation on error/success internally.
        executeDelete(id);
        // The modal is closed by its own internal logic after a valid confirmation attempt.
        // If you removed onClose() from the modal's handleConfirm, you would call it here:
        // closeConfirmationModal(); // Option 2: Close after successful call to executeDelete
    };

    if (isLoading) {
        return (<div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white">
            <p className="text-lg">Loading users...</p>
        </div>);
    }

    if (error) {
        return (<div
            className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-red-500 text-center px-4">
            <p className="text-lg">{error}</p>
            <div className="mt-6">
                <Link to="/login">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 transition duration-300">
                        Back to Login
                    </button>
                </Link>
            </div>
        </div>);
    }

    return (
        <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16"> {/* Adjust padding responsively */}
            <div className="flex justify-center items-center mb-6 pt-12">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Users</h1> {/* Adjust title size responsively */}
            </div>

            <div className="mb-6 text-center sm:text-left"> {/* Center button on small screens, left-align on larger */}
                <Link to="/users/create">
                    <button
                        className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 transition duration-300 ease-in-out"
                    >
                        Create New User
                    </button>
                </Link>
            </div>

            <div className="bg-neutral-800 rounded-lg shadow-md overflow-hidden"> {/* Card-like container for the list */}
                {users.map(user => (
                    <div
                        key={user.id}
                        className="flex flex-col xl:flex-row items-center justify-between p-4 border-b border-neutral-700 last:border-b-0 gap-4 xl:gap-2" // Stack on xlall, row on xl+. Added gap.
                    >
                        {/* User Information */}
                        {/* Removed the block Link around user info to allow wrapping */}
                        <div className="flex flex-col xl:flex-row xl:items-center gap-2 xl:gap-4 text-gray-200 w-full xl:w-auto flex-grow"> {/* Stack info on xlall, row on xl+. Added flex-grow */}
                            {/* Add flex-shrink-0 to prevent ID from shrinking too much */}
                            <span className="font-bold xl:font-normal w-full xl:w-12 flex-shrink-0"> {user.id}</span> {/* Show "ID:" label on xlall screens */}
                            <span className="min-w-0 flex-1 truncate"><span className="xl:hidden font-bold">Name: </span>{user.name} {user.surname}</span> {/* Show labels on xlall screens */}
                            <span className="min-w-0 flex-1 truncate"><span className="xl:hidden font-bold">Email: </span>{user.email}</span>
                            <span className="min-w-0 flex-1 truncate"><span className="xl:hidden font-bold">Hero: </span>{user.hero}</span>
                            <span className="min-w-0 flex-1 truncate"><span className="xl:hidden font-bold">Info: </span>{user.info}</span>
                        </div>


                        {/* Action Buttons */}
                        <div className="flex space-x-2 flex-shrink-0 mt-2 xl:mt-0"> {/* Container for buttons, prevent shrinking, add top margin on xlall */}
                            {/* View Button */}
                            <Link to={`/users/${user.id}`}>
                                <button
                                    className="px-3 py-1 bg-blue-500 text-white text-xl rounded hover:bg-blue-600 w-full xl:w-auto text-center" // Make button full width on xlall
                                >
                                    View
                                </button>
                            </Link>

                            {/* Edit Link */}
                            <Link to={`/users/${user.id}/edit`}>
                                <button
                                    className="px-3 py-1 bg-yellow-500 text-white text-xl rounded hover:bg-yellow-600 w-full xl:w-auto text-center" // Make button full width on xlall
                                >
                                    Edit
                                </button>
                            </Link>

                            {/* Delete Button - NOW CALLS openConfirmationModal */}
                            <button
                                onClick={() => openConfirmationModal(user.id)}
                                className="px-3 py-1 bg-red-500 text-white text-xl rounded hover:bg-red-600 w-full xl:w-auto text-center" // Make button full width on xlall
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Render the ConfirmationModal component */}
            <ConfirmationModal
                isOpen={showConfirmationModal}
                userId={userToDeleteId} // Pass the user ID to the modal
                onConfirm={handleModalConfirm} // Pass the function to call on valid confirmation
                onClose={closeConfirmationModal} // Pass the function to call on cancel or successful confirmation
                correctPasscode="1234" // Pass the required passcode
                message="user" // Pass a custom message part
            />
        </div>
    );
}