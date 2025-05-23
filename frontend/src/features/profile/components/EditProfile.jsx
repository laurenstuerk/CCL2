import { useState, useRef } from "react";
import ProfileImageUploader from "../../../components/ProfileImageUploader";

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
  const [profilePicUrl, setProfilePicUrl] = useState(user.profilePicture);

  const handleUploadComplete = (url) => {
    setProfilePicUrl(url); // for preview
    setFormData((prev) => ({ ...prev, profilePicture: url })); // for save
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto px-4 py-8 space-y-8"
    >
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        Edit Profile
      </h2>

      {/* Profile Picture */}
      <div className="flex flex-col items-center space-y-2">
        <img
          src={profilePicUrl || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border border-neutral-700"
        />
        <ProfileImageUploader
          userId={user.id}
          onUploadComplete={handleUploadComplete}
        />
        <p className="text-sm text-neutral-400 text-center">
          Click the button above to upload a new photo
        </p>
      </div>

      {/* Input Fields */}
      <div className="grid sm:grid-cols-2 gap-6 text-white">
        <div>
          <label className="block mb-1 text-sm text-neutral-400">
            First Name
          </label>
          <input
            name="name"
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
