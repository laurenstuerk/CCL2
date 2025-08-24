// frontend/src/pages/public/RegisterPage.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { register } from "../../services/authApi.js";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { Helmet } from 'react-helmet-async';
import { Eye, EyeOff } from "lucide-react";

// Import ShadCN UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function RegisterPage() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "", // Added for validation
  });

  // --- TanStack Mutation for Standard Registration ---
  const registerMutation = useMutation({
    mutationFn: register, // The function from authApi.js
    onSuccess: (data) => {
      toast.success("Registration successful! Logging you in...");
      // --- SEAMLESS UX: Automatically log the user in after registering ---
      // We use the email and password they just provided.
      handleAutoLogin(formData.email, formData.password);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed.");
    },
  });

  // --- TanStack Mutation for Google Sign-In ---
  const googleMutation = useMutation({
    mutationFn: loginWithGoogle, // The function from our AuthContext
    onSuccess: (result) => {
      if (result.success) {
        navigate("/dashboard");
      } else {
        toast.error(result.error || "Google login failed.");
      }
    },
    onError: () => {
      toast.error("An unexpected error occurred during Google sign-in.");
    },
  });

  // --- Event Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }
    registerMutation.mutate(formData);
  };

  const handleAutoLogin = async (email, password) => {
    try {
      const result = await login(email, password);
      if (result.accessToken) {
        navigate("/dashboard");
      } else {
        // This case should be rare, but handles if auto-login fails
        toast.info("Please log in with your new credentials.");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Failed to automatically log in.");
      navigate("/login");
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    // The context expects the ID token string
    googleMutation.mutate(credentialResponse.credential);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-12 text-white">
    <Helmet>
      <title>Register - Ripground</title>
      <meta name="description" content="Create a new account to join the Ripground community and start your journey." />
    </Helmet>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Create an Account</h1>
          <p className="mt-3 text-neutral-300">Join our community to start your journey.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">First Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-2 bg-neutral-800 border-neutral-700" autoComplete="given-name" />
            </div>
            <div>
              <Label htmlFor="surname">Surname</Label>
              <Input id="surname" name="surname" value={formData.surname} onChange={handleChange} required className="mt-2 bg-neutral-800 border-neutral-700" autoComplete="family-name" />
            </div>
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="username" name="username" value={formData.username} onChange={handleChange} required className="mt-2 bg-neutral-800 border-neutral-700" autoComplete="username" />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-2 bg-neutral-800 border-neutral-700" autoComplete="email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" name="password" value={formData.password} onChange={handleChange} required className="mt-2 bg-neutral-800 border-neutral-700" autoComplete="new-password" />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="mt-2 bg-neutral-800 border-neutral-700" autoComplete="new-password" />
          </div>

          <Button type="submit" disabled={registerMutation.isPending} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 ">
            {registerMutation.isPending ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <Separator className="flex-1 bg-neutral-800" />
          <span className="text-neutral-400 text-xs font-medium">OR</span>
          <Separator className="flex-1 bg-neutral-800" />
        </div>

        <div className="flex justify-center">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => toast.error("Google sign-up failed. Please try again.")} theme="filled_black" text="signup_with" shape="rectangular" />
        </div>

        <div className="mt-8 text-center text-sm text-neutral-400">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-blue-400 hover:text-blue-300">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
}
