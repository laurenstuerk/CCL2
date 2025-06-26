import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator"; // Dein Separator-Import
import { Home } from 'lucide-react';
import { useAuth } from "../../context/AuthContext.jsx";
import { Helmet } from 'react-helmet-async';

// We define the ErrorPage component with default props
export default function ErrorPage({ 
  errorCode = "404", 
  errorMessage = "Page Not Found",
  errorDescription = "The requested page does not exist or has been moved."
}) {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-black text-white text-center px-4">
      <Helmet>
        <title>{errorCode} - {errorMessage}</title>
        <meta name="description" content={errorDescription} />
      </Helmet>

      {/* Main error display with vertical separator */}
      <div className="flex items-center justify-center gap-6 mb-8">
        <h1 className="text-3xl font-bold text-white">{errorCode}</h1>

        {/* For a vertical separator, it needs 'orientation' and a fixed height */}
        <Separator orientation="vertical" className="h-20 bg-neutral-700" />
        
        <h2 className="text-3xl font-semibold text-neutral-200">{errorMessage}</h2>
      </div>

      {/* Detailed description */}
      <p className="text-lg text-neutral-400 max-w-md mb-10">
        {errorDescription}
      </p>

      {/* Button to go back to the homepage */}
      <Link {...(user ? { to: "/dashboard" } : { to: "/" })} className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-950 text-white font-semibold rounded-lg shadow-lg transition-colors">
        <Home className="w-5 h-5" />
        Go to Homepage
      </Link>
    </div>
  );
}