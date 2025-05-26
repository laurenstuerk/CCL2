import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"; // Assuming this is from shadcn/ui or similar

export default function Security() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    // Add actual password update logic here
    console.log("Password update initiated:", { currentPassword, newPassword });
    // Example: alert("Password updated successfully!");
    // setCurrentPassword("");
    // setNewPassword("");
    // setConfirmPassword("");
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    // Add secure toggle logic here, e.g., API call to enable/disable 2FA
    console.log("Two-Factor Authentication Toggled:", !twoFactorEnabled);
    // Example: alert(`Two-Factor Authentication ${!twoFactorEnabled ? 'enabled' : 'disabled'}.`);
  };

  const handleDeleteAccount = () => {
    // It's highly recommended to use a confirmation modal for such destructive actions.
    if (window.confirm("Are you sure you want to delete your account? This action is permanent and cannot be undone.")) {
      console.log("Account deletion confirmed (placeholder).");
      // Add actual account deletion logic here
      // Example: alert("Account deletion process started.");
    } else {
      console.log("Account deletion cancelled.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8 text-white">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Security Settings</h1>
        <p className="mt-2 text-sm text-neutral-400">
          Manage your password, two-factor authentication, and other security preferences.
        </p>
      </header>

      {/* Section 1: Change Password */}
      <section aria-labelledby="change-password-heading">
        <h2 id="change-password-heading" className="text-xl font-semibold text-white mb-6">
          Change Password
        </h2>
        <div className="space-y-5">
          <div>
            <Label htmlFor="current-password" className="block text-sm font-medium text-neutral-300 mb-1.5">
              Current Password
            </Label>
            <Input
              type="password"
              id="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md shadow-sm"
              autoComplete="current-password"
            />
          </div>
          <div>
            <Label htmlFor="new-password" className="block text-sm font-medium text-neutral-300 mb-1.5">
              New Password
            </Label>
            <Input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md shadow-sm"
              autoComplete="new-password"
            />
          </div>
          <div>
            <Label htmlFor="confirm-password" className="block text-sm font-medium text-neutral-300 mb-1.5">
              Confirm New Password
            </Label>
            <Input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm rounded-md shadow-sm"
              autoComplete="new-password"
            />
          </div>
          <div className="pt-3">
            <Button
              onClick={handleChangePassword}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-blue-500"
            >
              Update Password
            </Button>
          </div>
        </div>
      </section>

      <hr className="my-8 border-neutral-700" />

      {/* Section 2: Two-Factor Authentication */}
      <section aria-labelledby="two-factor-heading">
        <div className="flex items-center justify-between mb-3">
          <h2 id="two-factor-heading" className="text-xl font-semibold text-white">
            Two-Factor Authentication
          </h2>
          <Switch
            checked={twoFactorEnabled}
            onCheckedChange={handleToggle2FA}
            aria-labelledby="two-factor-heading"
            className={`${
              twoFactorEnabled ? "bg-green-500" : "bg-neutral-700" // Using your original colors
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-green-500`} // Added focus rings consistent with buttons/inputs
          >
            <span className="sr-only">Enable two-factor authentication</span>
            <span
              className={`${
                twoFactorEnabled ? "translate-x-6" : "translate-x-1" // Using your original translate classes for the thumb
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
        <p className="text-sm text-neutral-400">
          Enhance your account's security by requiring a second form of verification during login.
        </p>
      </section>

      <hr className="my-8 border-neutral-700" />

      {/* Section 3: Delete Account */}
      <section aria-labelledby="delete-account-heading">
        <h2 id="delete-account-heading" className="text-xl font-semibold text-white mb-3">
          Delete Account
        </h2>
        <p className="text-sm text-red-400 mb-4"> {/* Adjusted color slightly, you can use text-red-500 if preferred */}
          Permanently remove your account and all associated data. This action is irreversible and cannot be undone.
        </p>
        <div>
          <Button
            onClick={handleDeleteAccount}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-red-500"
          >
            Delete Account
          </Button>
        </div>
      </section>
    </div>
  );
}