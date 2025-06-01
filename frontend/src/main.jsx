import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AuthProvider} from './context/AuthContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <GoogleOAuthProvider clientId={CLIENT_ID}>
                <QueryClientProvider client={queryClient}>
                    <App/>
                </QueryClientProvider>
            </GoogleOAuthProvider>
        </AuthProvider>
    </StrictMode>,
)
