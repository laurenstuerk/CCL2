import {Link} from 'react-router-dom';
import Background from '../assets/images/Fractal.jpg';
import reactLogo from '../assets/images/reactLogo.svg';
import tailwindLogo from '../assets/images/TailwindLogo.svg';
import reactRouterLogo from '../assets/images/reactRouterLogo.svg';
import viteLogo from '../assets/images/viteLogo.svg';
import blenderLogo from '../assets/images/blenderLogo.svg';
import splineLogo from '../assets/images/splineLogo.png';
import SplineScene from '../components/SplineScene.jsx'

import {List, User, PlusCircle, Edit, Trash2, Globe} from 'lucide-react';

function HomePage() {
    return (
        // Main container for the entire page
        <div className="flex flex-col min-h-screen">

            {/* Section 1: Full-Screen Welcome */}
            {/* This section takes full viewport height and width */}
            <section
                className="relative h-screen w-full bg-cover bg-center contrast-[1.04] flex items-center justify-center text-white border-b border-neutral-800"
                style={{
                    backgroundImage: `url(${Background})`,
                }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 text-center p-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-4">Workframe</h1>
                    <p className="text-xl font-[GeistMono] md:text-2xl mb-8">Your Simple User manegmaent System</p>
                </div>
            </section>

            {/* Section 2: About the Project */}
            <section className=" h-screen content-center py-16 px-4 bg-gray-990 text-gray-100">
                <div className="max-w-4xl mx-auto font-[GeistMono]">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">About</h2>
                    <p className="text-lg mb-4">
                        Welcome to a simple web application designed for managing user information.
                    </p>
                    <p className="text-lg mb-4">
                        This project serves as a demonstration of building a Single Page Application (SPA) using React,
                        focusing on essential Create, Read, Update, and Delete (CRUD) operations.
                    </p>
                    <p className="text-lg">
                        Users can view a list of all users, see detailed profiles, add new members, edit existing
                        information, and remove members through an intuitive user interface.
                    </p>
                    <p className="text-md mt-8 text-center">FWoC Semester Project by Laurens Türk (cc241049)</p>
                </div>
            </section>

            {/* Section 3: Key Features - Beautified */}
            <section className="py-16 px-4 bg-black text-gray-200 border-b border-neutral-800">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Key Features</h2>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 font-[GeistMono]">
                        <li className="bg-neutral-950 p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300 flex items-start space-x-4">
                            <List className="w-8 h-8 text-blue-400 flex-shrink-0"/>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-white">User Listing</h3>
                                <p className="text-gray-400">View a comprehensive list of all users.</p>
                            </div>
                        </li>

                        <li className="bg-neutral-950 p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300 flex items-start space-x-4">
                            <User className="w-8 h-8 text-green-400 flex-shrink-0"/>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-white">User Details</h3>
                                <p className="text-gray-400">Access detailed information for each individual member.</p>
                            </div>
                        </li>

                        <li className="bg-neutral-950 p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300 flex items-start space-x-4">
                            <PlusCircle className="w-8 h-8 text-yellow-400 flex-shrink-0"/>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-white">Add New User</h3>
                                <p className="text-gray-400">Easily add new members to the directory.</p>
                            </div>
                        </li>

                        <li className="bg-neutral-950 p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300 flex items-start space-x-4">
                            <Edit className="w-8 h-8 text-purple-400 flex-shrink-0"/>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-white">Edit User</h3>
                                <p className="text-gray-400">Update existing member information.</p>
                            </div>
                        </li>

                        <li className="bg-neutral-950 p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300 flex items-start space-x-4">
                            <Trash2 className="w-8 h-8 text-red-400 flex-shrink-0"/>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-white">Delete User</h3>
                                <p className="text-gray-400">Remove members from the system (with confirmation).</p>
                            </div>
                        </li>

                        <li className="bg-neutral-950 p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300 flex items-start space-x-4">
                            <Globe className="w-8 h-8 text-teal-400 flex-shrink-0"/>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-white">Single Page Application</h3>
                                <p className="text-gray-400">Seamless navigation without page reloads.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>


            {/* Section 4: Technologies Used */}
            <section className="py-16 px-4 bg-neutral-950 text-gray-200 border-b border-neutral-800">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
                        Technologies Used
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-neutral-900 p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300 flex items-start space-x-4">
                            <img src={reactLogo} className="w-14 h-14"/>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-white">React.js</h3>
                                <p className="text-gray-400">Frontend Library</p>
                            </div>
                        </div>
                        <div className="bg-neutral-900 p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300 flex items-start space-x-4">
                            <img src={reactRouterLogo} className="w-14 h-14"/>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-white">React Router</h3>
                                <p className="text-gray-400">Navigation</p>
                            </div>
                        </div>
                        <div className="bg-neutral-900 p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300 flex items-start space-x-4">
                            <img src={tailwindLogo} className="w-14 h-14"/>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-white">Tailwind CSS</h3>
                                <p className="text-gray-400">Styling</p>
                            </div>
                        </div>
                        <div className="bg-neutral-900 p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300 flex items-start space-x-4">
                            <img src={splineLogo} className="w-14 h-14"/>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-white">Spline</h3>
                                <p className="text-gray-400">3D Design</p>
                            </div>
                        </div>
                        <div className="bg-neutral-900 p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300 flex items-start space-x-4">
                            <img src={viteLogo} className="w-14 h-14"/>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-white">Vite</h3>
                                <p className="text-gray-400">Build Tool</p>
                            </div>
                        </div>
                        <div className="bg-neutral-900 p-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300 flex items-start space-x-4">
                            <img src={blenderLogo} className="h-14 w-14 "/>
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-white">Blender</h3>
                                <p className="text-gray-400">Logo</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>



            {/* Section 5: Call to Action */}
            <section className="h-screen content-center py-16 px-4 bg-black text-gray-50 text-center border-b border-neutral-800">
                <h2 className="text-3xl md:text-4xl font-bold mb-8">Get Started</h2>
                <p className="text-lg mb-8">Please login to access the user management features.</p>
                <Link
                    to="/login"
                    className="inline-block px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                    Go to Login
                </Link>
            </section>

        </div>
    );
}

export default HomePage;
