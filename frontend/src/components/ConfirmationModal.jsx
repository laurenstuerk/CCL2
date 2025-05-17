// components/ConfirmationModal.jsx
import React, { useState, useEffect, useRef } from 'react';

// Props:
// isOpen: boolean to control visibility
// userId: the ID of the user being confirmed (or just general item ID)
// onConfirm: function to call when confirmed with correct passcode (receives userId)
// onClose: function to call when modal is cancelled or successfully confirmed
// correctPasscode: the passcode string expected for confirmation (e.g., "1234")
// message: a string message to display in the modal (e.g., "user ID")

export default function ConfirmationModal({
                                              isOpen,
                                              userId,
                                              onConfirm,
                                              onClose,
                                              correctPasscode,
                                              message = "item" // Default message
                                          }) {
    // State for the four input blocks
    const [passcodeDigits, setPasscodeDigits] = useState(['', '', '', '']);
    const [modalError, setModalError] = useState('');

    // Refs for the input elements to manage focus
    const inputRefs = useRef([]);

    // State for the password tooltip visibility
    const [showPasscodeTooltip, setShowPasscodeTooltip] = useState(false);

    // Clear state when modal is opened/closed
    useEffect(() => {
        if (isOpen) {
            setPasscodeDigits(['', '', '', '']);
            setModalError('');
            // Auto-focus the first input when the modal opens
            if (inputRefs.current[0]) {
                setTimeout(() => {
                    inputRefs.current[0].focus();
                }, 50);
            }
        }
    }, [isOpen]);

    if (!isOpen) {
        return null; // Don't render anything if not open
    }

    // Handle input change for a single digit box
    const handleInputChange = (index, value) => {
        const digit = value.slice(0, 1);

        const newPasscodeDigits = [...passcodeDigits];
        newPasscodeDigits[index] = digit;
        setPasscodeDigits(newPasscodeDigits);

        if (digit && index < 3 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Handle key down events (like backspace)
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && passcodeDigits[index] === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
        else if (e.key === 'Backspace' && passcodeDigits[index] !== '') {
            const newPasscodeDigits = [...passcodeDigits];
            newPasscodeDigits[index] = '';
            setPasscodeDigits(newPasscodeDigits);
            e.preventDefault();
        }
        else if (e.key === 'Enter') {
            handleConfirm();
        }
    };

    const handleConfirm = () => {
        const enteredPasscode = passcodeDigits.join('');

        if (enteredPasscode === correctPasscode) {
            setModalError('');
            onConfirm(userId);
            onClose();
        } else {
            setModalError('Invalid passcode');
            setPasscodeDigits(['', '', '', '']);
            if (inputRefs.current[0]) {
                inputRefs.current[0].focus();
            }
        }
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-neutral-800 text-white p-6 rounded-lg shadow-xl w-full max-w-sm mx-4">

                {/* Headline Container - Use flex and justify-center to center the inline-block h2 */}
                <div className="flex justify-center mb-4">
                    {/* Headline with Tooltip - Keep relative and inline-block for tooltip positioning */}
                    <div className="relative inline-block">
                        <h2
                            className="text-xl font-semibold cursor-pointer" // Removed mb-4 as it's on the parent div
                            onMouseEnter={() => setShowPasscodeTooltip(true)}
                            onMouseLeave={() => setShowPasscodeTooltip(false)}
                        >
                            Confirm Action
                        </h2>
                        {showPasscodeTooltip && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-700 text-white text-sm rounded shadow-lg z-50 whitespace-nowrap">
                                Password: {correctPasscode}
                                {/* Optional: Add a small arrow */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-4px] w-0 h-0 border-l-4 border-r-4 border-t-4 border-gray-700 border-solid border-transparent"></div>
                            </div>
                        )}
                    </div>
                </div>


                {/* Text Paragraph - Added text-center */}
                <p className="mb-4 text-center">
                    To confirm action on {message} ID: <span className="font-bold">{userId}</span>, please enter the passcode:
                </p>

                {/* Four Input Blocks - justify-center already applied */}
                <div className="flex justify-center space-x-2 mb-4">
                    {passcodeDigits.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => inputRefs.current[index] = el}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-12 text-center text-2xl bg-neutral-700 border border-neutral-600 rounded text-white placeholder-neutral-400 focus:outline-none focus:border-blue-500"
                            style={{ caretColor: 'transparent' }}
                            inputMode="numeric"
                        />
                    ))}
                </div>

                {/* Error Message - Kept text-center */}
                {modalError && (
                    <p className="text-red-500 text-sm mb-4 text-center">{modalError}</p>
                )}

                {/* Buttons Container - Changed justify-end to justify-center */}
                <div className="flex justify-center space-x-3">
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 transition duration-300 ease-in-out"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}