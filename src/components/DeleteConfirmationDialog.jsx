// src/components/DeleteConfirmationDialog.jsx (Upgraded)

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Default phrase if none is provided
const DEFAULT_CONFIRMATION_PHRASE = "DELETE";

export default function DeleteConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  isPending,
  requirePassword = false, // Default to not requiring a password
  confirmationPhrase,      // Allow custom phrase
  itemType = 'item'        // Generic item type for messages
}) {
  const [password, setPassword] = useState("");
  const [confirmationInput, setConfirmationInput] = useState("");

  const effectiveConfirmationPhrase = confirmationPhrase || DEFAULT_CONFIRMATION_PHRASE;
  const canConfirm = !confirmationPhrase || confirmationInput === effectiveConfirmationPhrase;

  const handleConfirmClick = () => {
    if (requirePassword && !password) {
      toast.error("Password is required to confirm this action.");
      return;
    }
    // Pass back the password if it was required
    onConfirm({ password: requirePassword ? password : undefined });
  };
  
  const handleOnOpenChange = (isOpen) => {
    if (!isOpen) {
      setPassword("");
      setConfirmationInput("");
    }
    onOpenChange(isOpen);
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOnOpenChange}>
      <AlertDialogContent className="bg-neutral-900 border-neutral-800 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-neutral-300">
            This action is permanent and cannot be undone. This will permanently delete the selected {itemType}.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-4 space-y-6">
          {/* --- Conditionally render the confirmation phrase input --- */}
          {confirmationPhrase && (
            <div>
              <Label htmlFor="confirmation-phrase">
                To confirm, type "<span className="font-bold text-red-400">{effectiveConfirmationPhrase}</span>" below:
              </Label>
              <Input
                id="confirmation-phrase"
                value={confirmationInput}
                onChange={(e) => setConfirmationInput(e.target.value)}
                className="mt-2 bg-neutral-800 border-neutral-700"
                autoComplete="off"
              />
            </div>
          )}

          {/* --- Conditionally render the password input --- */}
          {requirePassword && (
            <div>
              <Label htmlFor="confirm-password-delete">Enter your password to finalize</Label>
              <Input id="confirm-password-delete" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 bg-neutral-800 border-neutral-700" />
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmClick}
            disabled={!canConfirm || isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {isPending ? "Deleting..." : `Delete ${itemType}`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}