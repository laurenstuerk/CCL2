import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setupMfa, verifyMfa, disableMfa } from "@/services/authApi";
import { updateUserPassword, deleteAccount } from "@/services/userApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import { useNavigate } from "react-router-dom";

export default function Security() {
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [mfaToken, setMfaToken] = useState("");
  const queryClient = useQueryClient();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Mutation to start the MFA setup and get a QR code
  const setupMfaMutation = useMutation({
    mutationFn: setupMfa,
    onSuccess: (data) => {
      setQrCodeUrl(data.qrCodeUrl); // Show the QR code section
    },
    onError: (error) => {
      console.error(error);
    },
  });

  // Mutation to disable MFA
  const disableMfaMutation = useMutation({
    mutationFn: disableMfa,
    onSuccess: () => {
      setQrCodeUrl(null);
    },
    onError: (error) => {
      toast.error("Failed to disable MFA. Please try again later.");
    },
  });

  // Mutation to verify the token and enable MFA ---
  const verifyMfaMutation = useMutation({
    mutationFn: verifyMfa,
    onSuccess: () => {
      setQrCodeUrl(null);
      setMfaToken("");

      // It tells React to refetch the user, which will update the context
      // and automatically update the switch to be "on".
      toast.success("MFA Enabled! Refreshing user data...");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: updateUserPassword, // The function from userApi.js
    onSuccess: () => {
      toast.success("Password updated successfully!");
      // Clear the input fields for security and good UX
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update password.");
    },
  });

  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success("Account deleted successfully. You have been logged out.");
      // The backend has cleared the cookie, now clear the frontend state and redirect.
      logout();
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete account.");
    },
  });

  // console.log(user.hasPassword)

  const handleToggleMfa = () => {
    // --- MODIFIED ---
    if (user?.mfa_enabled) {
      // Disabling MFA
      disableMfaMutation.mutate(); // Assuming you have a mutation for disabling MFA
    } else {
      // Enabling MFA
      setupMfaMutation.mutate();
    }
  };

  const handleVerifyAndEnable = () => {
    if (mfaToken.length === 6) {
      verifyMfaMutation.mutate(mfaToken);
    } else {
      toast.error("Please enter a valid 6-digit token.");
    }
  };

  const handleCancelMfaSetup = () => {
    setQrCodeUrl(null);
    setMfaToken("");
  };

  const handleChangePassword = () => {
    if (user.hasPassword && !currentPassword) {
      toast.error("Current password is required to make changes.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    // Dynamically build the payload based on whether a current password is required
    const payload = { newPassword };
    if (user.hasPassword) {
      payload.currentPassword = currentPassword;
    }
    updatePasswordMutation.mutate(payload);
  };

  const handleConfirmDelete = (data) => {
    deleteAccountMutation.mutate({ password: data.password });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    // Add secure toggle logic here, e.g., API call to enable/disable 2FA
    // console.log("Two-Factor Authentication Toggled:", !twoFactorEnabled);
    // Example: alert(`Two-Factor Authentication ${!twoFactorEnabled ? 'enabled' : 'disabled'}.`);
  };

  const handleDeleteAccountClick = () => {
    // This handler's only job is to open the dialog
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <div className="w-full mx-auto py-10 px-4 sm:px-6 lg:px-8 text-white">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Security Settings</h1>
          <p className="mt-2 text-sm text-neutral-400">Manage your password, two-factor authentication, and other security preferences.</p>
        </header>

        {/* Section to Change Password */}
        <section aria-labelledby="change-password-heading">
          <h2 id="change-password-heading" className="text-xl font-semibold text-white mb-6">
            Change Password
          </h2>
          <div className="space-y-5">

            {user.hasPassword && (
              <div>
                <Label htmlFor="current-password" className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Current Password
                </Label>
                <Input type="password" id="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md shadow-sm" autoComplete="current-password" />
              </div>
            )}

            <div>
              <Label htmlFor="new-password" className="block text-sm font-medium text-neutral-300 mb-1.5">
                New Password
              </Label>
              <Input type="password" id="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md shadow-sm" autoComplete="new-password" />
            </div>
            <div>
              <Label htmlFor="confirm-password" className="block text-sm font-medium text-neutral-300 mb-1.5">
                Confirm New Password
              </Label>
              <Input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md shadow-sm" autoComplete="new-password" />
            </div>
            <div className="pt-3">
              <Button onClick={handleChangePassword} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-blue-500">
                Update Password
              </Button>
            </div>
          </div>
        </section>

        <hr className="my-8 border-neutral-700" />

        {/* --- Section 2: Two-Factor Authentication (MODIFIED) --- */}
        <section aria-labelledby="two-factor-heading">
          <div className="flex items-center justify-between mb-3">
            <h2 id="two-factor-heading" className="text-xl font-semibold text-white">
              Two-Factor Authentication
            </h2>
            <Switch
              checked={user?.mfa_enabled}
              onCheckedChange={handleToggleMfa}
              disabled={setupMfaMutation.isPending || !!qrCodeUrl} // Disable while setting up
              aria-labelledby="two-factor-heading"
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
            />
          </div>
          <p className="text-sm text-neutral-400">Enhance your account's security by requiring a second form of verification during login.</p>

          {/* --- NEW: MFA Setup UI (conditionally rendered) --- */}
          {qrCodeUrl && (
            <div className="mt-6 p-6 border border-neutral-700 rounded-lg bg-neutral-800/50">
              <h3 className="text-lg font-medium text-white">Enable Two-Factor Authentication</h3>
              <p className="text-sm text-neutral-400 mt-1">Scan the image below with your authenticator app, then enter the 6-digit code.</p>
              <div className="my-4 flex justify-center">
                <img src={qrCodeUrl} alt="MFA QR Code" className="bg-white p-2 rounded-md" />
              </div>

              <div>
                <Label htmlFor="mfa-token" className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Verification Code
                </Label>
                <Input id="mfa-token" type="text" value={mfaToken} onChange={(e) => setMfaToken(e.target.value)} placeholder="123456" maxLength={6} className="bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 w-full sm:w-64" autoComplete="one-time-code" />
              </div>

              <div className="mt-4 flex gap-4">
                <Button onClick={handleVerifyAndEnable} disabled={verifyMfaMutation.isPending} className="bg-green-600 hover:bg-green-700">
                  {verifyMfaMutation.isPending ? "Verifying..." : "Verify & Enable"}
                </Button>
                <Button variant="outline" onClick={handleCancelMfaSetup} disabled={verifyMfaMutation.isPending}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </section>

        <hr className="my-8 border-neutral-700" />

        {/* Section 3: Delete Account */}
        <section aria-labelledby="delete-account-heading">
          <h2 id="delete-account-heading" className="text-xl font-semibold text-white mb-3">
            Delete Account
          </h2>
          <p className="text-sm text-red-400 mb-4">
            {" "}
            {/* Adjusted color slightly, you can use text-red-500 if preferred */}
            Permanently remove your account and all associated data. This action is irreversible and cannot be undone.
          </p>
          <div>
            <Button className="bg-red-600 hover:bg-red-700" variant="destructive" onClick={handleDeleteAccountClick}>
              Delete My Account
            </Button>
          </div>
        </section>
      </div>
      <DeleteConfirmationDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen} onConfirm={handleConfirmDelete} isPending={deleteAccountMutation.isPending} />
    </>
  );
}
