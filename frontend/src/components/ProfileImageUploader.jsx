// src/components/ProfileImageUploader.jsx
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ProfileImageUploader({ userId, onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const filePath = `avatars/${userId}-${Date.now()}.${fileExt}`;

    setUploading(true);
    setError(null);

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { cacheControl: "3600", upsert: true });

    if (uploadError) {
      setError("Upload failed.");
      console.error(uploadError);
    } else {
      const { data } = await supabase.storage
        .from("avatars")
        .createSignedUrl(filePath, 3600); // Expires in 1 hour
    }

    setUploading(false);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <label className="cursor-pointer bg-neutral-800 text-white px-4 py-2 rounded hover:bg-neutral-700">
        {uploading ? "Uploading..." : "Upload Profile Picture"}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
