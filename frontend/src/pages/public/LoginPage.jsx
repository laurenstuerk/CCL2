import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import OtpComponent from "../../components/OtpComponent.jsx";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, loginWithGoogle, finalizeMfaLogin } = useAuth();

  const [showMfaForm, setShowMfaForm] = useState(false);
  const [mfaUserId, setMfaUserId] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await login(email, password);
      // console.log("Login result:", result);
      if (result.accessToken) {
        navigate("/dashboard");
      } else if (result.mfaRequired) {
        setMfaUserId(result.userId);
        setShowMfaForm(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An unknown error occurred.");
    }
  };

  // This function is now passed as a prop to the OtpComponent
  const handleMfaVerification = async (otpValue) => {
    setError("");
    setIsVerifying(true); // Set loading to true
    try {
      await finalizeMfaLogin({ userId: mfaUserId, token: otpValue });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP code.");
      toast.error("Invalid Code. Please try again.");
    } finally {
      setIsVerifying(false); // Set loading to false
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setError(""); // Reset error

    // The 'credential' field contains the required ID token
    const result = await loginWithGoogle(credentialResponse.credential);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <Helmet>
        <title>Login - Ripground</title>
        <meta name="description" content="Login to your Ripground account to access your dashboard and manage your profile." />
      </Helmet>
      <div className="max-w-md w-full backdrop-blur-md rounded-xl shadow-2xl p-8">
        {!showMfaForm ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-6 text-white">Login</h1>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </Label>
                <Input type="email" id="email" className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" tabIndex={-1} className="text-sm text-blue-400 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="pr-10 mt-1 bg-neutral-800 border-neutral-600" />
                  <Button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-white" aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isVerifying} // We'll need to track the loading state
                className="w-full h-10 px-6 font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition-all duration-300
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black
             hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]
             active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? "Authenticating..." : "Login"}
              </Button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-neutral-700"></div>
              <span className="mx-4 text-gray-400">or</span>
              <div className="flex-grow border-t border-neutral-700"></div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin theme="filled_black" onSuccess={handleGoogleLogin} onError={() => setError("Google Login error")} auto_select={true} />
            </div>

            <div className="flex items-center justify-between mt-6">
              <span className="text-sm text-gray-400">Don't have an account?</span>
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </div>
          </>
        ) : (
          // --- MODIFIED: Use the new reusable component ---
          <OtpComponent
            title="Two-Factor Authentication"
            description="Check your authenticator app for the 6-digit code."
            isLoading={isVerifying}
            error={error}
            onComplete={handleMfaVerification}
            onCancel={() => {
              setShowMfaForm(false);
              setError("");
            }}
          />
        )}
        <p className="text-sm text-gray-400">
          By signing in, you agree to our{" "}
          <Link className="underline hover:text-white" to="/terms-of-service">
            Terms
          </Link>{" "}
          and{" "}
          <Link className="underline hover:text-white" to="/privacy-policy">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
