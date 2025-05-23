import { useState, useRef } from "react";
import { updateUser, uploadProfilePicture } from "../../../services/userApi";
import { getUserIdFromToken } from "../../../utils/auth";

export default function EditProfile({ user, onSave }) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    surname: user.surname || "",
    username: user.username || "",
    phone: user.phone || "",
    email: user.email || "",
    country: user.country || "",
    birthdate: user.birthdate ? user.birthdate.slice(0, 10) : "",
    profilePicture: user.profilePicture || "",
  });

  const [preview, setPreview] = useState(user.profilePicture || "");
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const userId = getUserIdFromToken();

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "username") {
      newValue = value.toLowerCase().replace(/\s+/g, ""); // remove spaces and lowercase
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    try {
      setLoading(true);
      const response = await uploadProfilePicture(token, file);
      setFormData((prev) => ({
        ...prev,
        profilePicture: response.imageUrl,
      }));
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Image upload failed");
    } finally {
      setLoading(false);
    }
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await updateUser(token, userId, formData);
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto px-4 py-8 space-y-8"
    >
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        Edit Profile
      </h2>
      <div className="flex flex-col items-center space-y-2">
        <img
          src={
            preview ||
            `https://avatar.iran.liara.run/username?username=${user.name}+${user.surname}`
          }
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border border-neutral-700"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="px-4 py-1 bg-neutral-700 hover:bg-neutral-600 rounded text-white text-sm"
        >
          Select Profile Picture
        </button>
      </div>
      {/* Input Fields */}
      <div className="grid sm:grid-cols-2 gap-6 text-white">
        <div>
          <label className="block mb-1 text-sm text-neutral-400">
            First Name
          </label>
          <input
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-neutral-400">
            Last Name
          </label>
          <input
            name="surname"
            required
            value={formData.surname}
            onChange={handleChange}
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-neutral-400">
            Username
          </label>
          <input
            name="username"
            required
            pattern="[a-z0-9_]+"
            title="Only lowercase letters, numbers, and underscores. No spaces."
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-neutral-400">
            Phone Number
          </label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-neutral-400">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-neutral-400">Country</label>
          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-neutral-400">Info</label>
          <textarea
            name="info"
            type="text"
            value={formData.info}
            onChange={handleChange}
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-neutral-400">
            Birthdate
          </label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            className="w-full p-2 rounded bg-neutral-800 border border-neutral-700"
          />
        </div>
      </div>
      <div className="text-center mt-6">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
