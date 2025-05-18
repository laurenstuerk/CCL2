import {useState} from "react"
import {useNavigate} from "react-router-dom"
import * as apiService from '../api/userApi.js'
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
    const [email, setEmail] = useState("test1@test.com")
    const [password, setPassword] = useState("test")
    const [error, setError] = useState("")

    const navigate = useNavigate()
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const data = await apiService.login(email, password)
            login(data.token);
            navigate('/dashboard') // Redirect to users page after successful login
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
            <div className="max-w-md w-full bg-[rgba(32,33,36,0.25)] backdrop-blur-md rounded-xl shadow-2xl p-8 border border-neutral-700">
                <h1 className="text-3xl font-bold text-center mb-6 text-white">Login</h1>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white font-semibold rounded-md shadow-lg bg-[linear-gradient(90deg,rgba(48,88,140,1)_0%,rgba(115,41,90,1)_100%,rgba(63,28,50,1))] hover:opacity-90 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}