// src/components/ProfileImageUploader.jsx
import { useState } from "react";
import { supabase } from "../lib/supabaseClient"; // Ensure this path is correct

export default function ProfileImageUploader({ userId, onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching supabase user:", error);
    }

    // Log the Supabase authenticated user ID and the passed userId prop
    console.log("Supabase user ID:", user?.id);
    console.log("Passed userId:", userId);

    setUploading(true);
    setError(null);

    const fileExt = file.name.split(".").pop();
    // Construct a unique file path, e.g., within an 'avatars' folder in your bucket
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = fileName; // Path within the bucket

    try {
      // 1. Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("profile-pictures") // Your bucket name
        .upload(filePath, file, {
          cacheControl: "3600", // Optional: cache control header
          upsert: false, // Set to true if you want to overwrite existing files with the same path
        });

      if (uploadError) {
        console.error("Upload Error:", uploadError);
        setError(`Failed to upload image: ${uploadError.message}`);
        setUploading(false);
        return;
      }

      // 2. Get the public URL of the uploaded file
      // The filePath must exactly match the path used for uploading.
      const { data: publicUrlData } = supabase.storage
        .from("profile-pictures") // Your bucket name
        .getPublicUrl(filePath);

      if (!publicUrlData || !publicUrlData.publicUrl) {
        console.error("Error getting public URL:", publicUrlData);
        setError(
          "Failed to get public URL for the image. The image may have uploaded, but its URL could not be retrieved."
        );
        setUploading(false);
        // Optional: you might want to attempt to remove the uploaded file here
        // await supabase.storage.from("profile-pictures").remove([filePath]);
        return;
      }

      // 3. Call the callback with the public URL
      onUploadComplete(publicUrlData.publicUrl);
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      setError(err.message || "An unexpected error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <label className="cursor-pointer bg-neutral-800 text-white px-4 py-2 rounded hover:bg-neutral-700">
        {uploading ? "Uploading..." : "Upload Profile Picture"}
        <input
          type="file"
          accept="image/*" // Accepts any image type
          onChange={handleFileChange}
          disabled={uploading} // Disable input during upload
          className="hidden" // Hide the default file input
        />
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
