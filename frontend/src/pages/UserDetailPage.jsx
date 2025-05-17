// pages/UsersDetailPage.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUserById } from '../api/userApi.js';
import { useUserDelete } from '../hooks/useUserDelete.js'; // Import the hook
import ConfirmationModal from '../components/ConfirmationModal.jsx'; // Import the modal component


export default function UsersDetailPage() {
    const [user, setUser] = useState(null); // Initialize as null since we fetch it
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); // Get the user ID from the URL

    // State to control the confirmation modal visibility
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    // We don't strictly need userToDeleteId state here since the ID is from params,
    // but keeping it for consistency and clarity might be useful if logic changes.
    // Let's just use the `id` from useParams directly when opening/confirming.


    // Get the executeDelete function from the hook
    // Provide an onSuccess callback to navigate *after* successful deletion
    const executeDelete = useUserDelete({
        onSuccess: () => {
            // After successful deletion of the user on the detail page,
            // navigate back to the users list.
            navigate('/users');
        }
    });

    const fetchUser = async () => {
        setIsLoading(true);
        setError('');
        const token = localStorage.getItem("token");
        try {
            const data = await getUserById(token, id);
            setUser(data);
        } catch (error) {
            const status = error.response ? error.response.status : null;
            const message = error.response ? error.response.data.message : error.message;
            setError(message || 'An unexpected error occurred fetching user details');
            if (status === 401 || status === 403) {
                navigate('/login'); // Redirect to login if not authenticated
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Ensure id is available before fetching
        if (id) {
            fetchUser();
        } else {
            setError("No user ID provided in URL.");
        }
    }, [id]); // Depend on id so it refetches if ID changes in the URL

    // Function to open the modal - used by the delete button
    const openConfirmationModal = () => {
        // The user ID is already available from useParams
        setShowConfirmationModal(true);
    };

    // Function to close the modal - passed as onClose prop to ConfirmationModal
    const closeConfirmationModal = () => {
        setShowConfirmationModal(false);
        // No need to reset userToDeleteId state here as we don't use it
    };

    // This function is called by the ConfirmationModal when confirmed
    const handleModalConfirm = () => {
        // The modal validated the passcode. Now execute the delete using the ID from params.
        // executeDelete handles showing alerts/navigation on error/success internally.
        executeDelete(id);
        // The modal closes itself via its internal logic after a valid confirmation attempt.
    };


    if (isLoading) {
        return (<div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white">
            <p className="text-lg">Loading user...</p>
        </div>);
    }

    // If user is null and not loading and no error, it means user wasn't found or fetched yet
    if (!user && !isLoading && !error) {
        return (<div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-yellow-500 text-center px-4">
            <p className="text-lg">User not found or could not be loaded.</p>
            <div className="mt-6">
                <Link to="/users">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 transition duration-300">
                        Back to Users List
                    </button>
                </Link>
            </div>
        </div>);
    }


    if (error) {
        return (<div
            className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-red-500 text-center px-4">
            <p className="text-lg">{error}</p>
            <div className="mt-6">
                <button
                    onClick={fetchUser} // Add a retry button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 transition duration-300"
                >
                    Retry Fetching User
                </button>
                <Link to="/login" className="ml-4">
                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 transition duration-300">
                        Go to Login
                    </button>
                </Link>
            </div>
        </div>);
    }


    // Only render the detail content if user data is loaded
    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-2xl relative border-2 border-dashed border-gray-700 p-8 text-white font-mono overflow-hidden">

                <h1 className="text-3xl font-bold text-neutral-50 mb-8 tracking-wide text-center">User Details</h1> {/* Centered headline */}

                <div className="space-y-4 text-lg mb-8"> {/* Increased spacing and margin-bottom */}
                    <p><span className="text-gray-500 font-semibold w-24 inline-block">ID:</span> {user.id}</p> {/* Added user ID */}
                    <p><span className="text-gray-500 font-semibold w-24 inline-block">Name:</span> {user.name}</p>
                    <p><span className="text-gray-500 font-semibold w-24 inline-block">Surname:</span> {user.surname}</p>
                    <p><span className="text-gray-500 font-semibold w-24 inline-block">Email:</span> {user.email}</p>
                    <p><span className="text-gray-500 font-semibold w-24 inline-block">Hero:</span> {user.hero}</p>
                    <p><span className="text-gray-500 font-semibold w-24 inline-block">Info:</span> {user.info}</p>
                </div>

                <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <Link to="/users/">
                        <button className="w-full py-2 bg-gray-700 hover:bg-gray-800 uppercase text-sm tracking-widest transition">Back</button>
                    </Link>
                    {/* Use user?.id to safely access id */}
                    <Link to={`/users/${user?.id}/edit`}>
                        <button className="w-full py-2 bg-blue-700 hover:bg-blue-800 uppercase text-sm tracking-widest transition">Edit</button>
                    </Link>

                    {/* Delete Button - NOW CALLS openConfirmationModal */}
                    <button
                        onClick={openConfirmationModal} // Call the function to open the modal
                        className="w-full py-2 bg-red-700 hover:bg-red-800 uppercase text-sm tracking-widest transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
            {/* Render the ConfirmationModal component */}
            <ConfirmationModal
                isOpen={showConfirmationModal}
                userId={id} // Pass the ID from params to the modal
                onConfirm={handleModalConfirm} // Pass the function to call on valid confirmation
                onClose={closeConfirmationModal} // Pass the function to call on cancel or successful confirmation
                correctPasscode="1234" // Pass the required passcode
                message="user" // Pass a custom message part
            />
        </div>
    );
}