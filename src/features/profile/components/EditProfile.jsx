// frontend/src/features/profile/components/EditProfile.jsx

import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser, uploadProfilePicture, getMe } from "@/services/userApi"; 
import { toast } from "sonner";
import { Camera, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

// Import all necessary ShadCN UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils"; // Import the cn utility from ShadCN

export default function EditProfile() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

    const { data: userProfile, isLoading, isError, error } = useQuery({
    queryKey: ['me'], // A unique key for this query
    queryFn: getMe,   // The API function that calls GET /api/users/me
  });
  console.log("User Profile Data:", userProfile);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    phoneNumber: "",
    birthdate: null,
    country: "",
    info: "",
    socials: { instagram: "", twitter: "", github: "" },
  });

  const [preview, setPreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  useEffect(() => {
    if (userProfile) {
      let userSocials = { instagram: "", twitter: "", github: "" };
      if (typeof userProfile.socials === 'string') {
        try { userSocials = JSON.parse(userProfile.socials); } catch (e) { console.error("Invalid socials JSON"); }
      } else if (userProfile.socials) {
        userSocials = userProfile.socials;
      }
      setFormData({
        name: userProfile.name || "",
        surname: userProfile.surname || "",
        username: userProfile.username || "",
        email: userProfile.email || "",
        phoneNumber: userProfile.phoneNumber || "",
        birthdate: userProfile.birthdate ? new Date(userProfile.birthdate) : null,
        country: userProfile.country || "",
        info: userProfile.info || "",
        socials: {
          instagram: userSocials.instagram || "",
          twitter: userSocials.twitter || "",
          github: userSocials.github || ""
        }
      });
      setPreview(userProfile.profilePicture || "");
    }
  }, [userProfile])

  const updateProfileMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => toast.error(error.response?.data?.message || "Failed to update profile."),
  });

  const uploadPictureMutation = useMutation({
    mutationFn: uploadProfilePicture,
    onSuccess: (data) => {
      setPreview(data.imageUrl);
      toast.success("Profile picture updated!");
      queryClient.invalidateQueries({ queryKey: ["me"] });
      setIsUploadDialogOpen(false);
    },
    onError: (error) => toast.error(error.response?.data?.message || "Image upload failed."),
  });

  // --- CORRECTED Event Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, birthdate: date }));
  };

  const handleSocialsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev, socials: { ...prev.socials, [name]: value },
    }));
  };

  const handleFileSelect = (file) => {
    if (file) {
      uploadPictureMutation.mutate(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDragEnter = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a copy of formData to send, ensuring birthdate is in the correct format
    const submissionData = {
        ...formData,
        birthdate: formData.birthdate ? format(formData.birthdate, 'yyyy-MM-dd') : null,
    };
    updateProfileMutation.mutate(submissionData);
  };

  if (isLoading) {
    return (
        <div className="w-full max-w-4xl mx-auto py-8 text-white">
            <h1 className="text-3xl font-bold tracking-tight">Loading Profile...</h1>
            {/* You could add Skeleton loaders here */}
        </div>
    );
  }

  if (isError) {
    return (
        <div className="w-full max-w-4xl mx-auto py-8 text-red-400">
            <h1 className="text-3xl font-bold tracking-tight">Error</h1>
            <p>Could not fetch your profile data. Please try again later.</p>
            <pre className="mt-4 text-xs">{error.message}</pre>
        </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-4xl mx-auto py-8 text-white">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight" id="main-heading">Profile Settings</h1>
          <p className="mt-2 text-sm text-neutral-300">Manage your personal and public profile information.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-12" aria-labelledby="main-heading">
          <section aria-labelledby="picture-heading">
            <h2 id="picture-heading" className="text-xl font-semibold text-white">Profile Picture</h2>
            <div className="mt-4 flex items-center gap-6">
              <img
                src={preview || `https://avatar.iran.liara.run/username?username=${formData.name}+${formData.surname}`}
                alt="Current profile picture"
                className="w-28 h-28 rounded-full object-cover border-2 border-neutral-700"
              />
              <Button type="button" variant="outline" onClick={() => setIsUploadDialogOpen(true)}>
                Change Photo
              </Button>
            </div>
          </section>

          <Separator className="bg-neutral-800" />

          <section aria-labelledby="personal-info-heading">
            <h2 id="personal-info-heading" className="text-xl font-semibold text-white">Personal Information</h2>
            <p className="mt-1 text-sm text-neutral-300">This information will not be displayed on your public profile.</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              <div><Label htmlFor="name">First Name</Label><Input id="name" name="name" value={formData.name} onChange={handleChange} className="mt-2 bg-neutral-800 border-neutral-700" /></div>
              <div><Label htmlFor="surname">Last Name</Label><Input id="surname" name="surname" value={formData.surname} onChange={handleChange} className="mt-2 bg-neutral-800 border-neutral-700" /></div>
              <div>
                <Label htmlFor="birthdate">Birthdate</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      id="birthdate"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-2 bg-neutral-800 border-neutral-700 hover:bg-neutral-700",
                        !formData.birthdate && "text-neutral-400"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.birthdate ? format(formData.birthdate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar className={cn("bg-neutral-800 text-neutral-300 border-neutral-700")} mode="single" selected={formData.birthdate} onSelect={handleDateChange} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div><Label htmlFor="country">Country</Label><Input id="country" name="country" value={formData.country} onChange={handleChange} className="mt-2 bg-neutral-800 border-neutral-700" /></div>
            </div>
          </section>

          <Separator className="bg-neutral-800" />
          
          <section aria-labelledby="public-profile-heading">
            <h2 id="public-profile-heading" className="text-xl font-semibold text-white">Public Profile</h2>
            <p className="mt-1 text-sm text-neutral-300">This information will be visible to other users.</p>
             <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                <div><Label htmlFor="username">Username</Label><Input id="username" name="username" value={formData.username} onChange={handleChange} className="mt-2 bg-neutral-800 border-neutral-700" /></div>
                <div className="md:col-span-2"><Label htmlFor="info">Bio</Label><Textarea id="info" name="info" value={formData.info} onChange={handleChange} placeholder="Tell us about yourself." className="mt-2 bg-neutral-800 border-neutral-700" /></div>
             </div>
          </section>

          <Separator className="bg-neutral-800" />
          
          <section aria-labelledby="account-info-heading">
            <h2 id="account-info-heading" className="text-xl font-semibold text-white">Account Information</h2>
            <div className="mt-6 max-w-md space-y-8">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} className="mt-2 bg-neutral-800 border-neutral-700" />
                </div>
                <div><Label htmlFor="phoneNumber">Phone Number</Label><Input id="phoneNumber" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="mt-2 bg-neutral-800 border-neutral-700" /></div>
            </div>
          </section>

          <Separator className="bg-neutral-800" />

          <section aria-labelledby="social-links-heading">
            <h2 id="social-links-heading" className="text-xl font-semibold text-white">Social Links</h2>
            <p className="mt-1 text-sm text-neutral-300">Add your usernames to display social links on your profile.</p>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8">
                <div>
                    <Label htmlFor="github">GitHub</Label>
                    <div className="flex items-center mt-2">
                        <span className="inline-flex items-center  w-30 text-neutral-400 text-sm">github.com/</span>
                        <Input id="github" name="github" value={formData.socials.github} onChange={handleSocialsChange} placeholder="username" className="rounded-l-none bg-neutral-800 border-neutral-700" />
                    </div>
                </div>
                <div>
                    <Label htmlFor="twitter">X (Twitter)</Label>
                    <div className="flex items-center mt-2">
                        <span className="inline-flex items-center  w-30 text-neutral-400 text-sm">x.com/</span>
                        <Input id="twitter" name="twitter" value={formData.socials.twitter} onChange={handleSocialsChange} placeholder="username" className="rounded-l-none bg-neutral-800 border-neutral-700" />
                    </div>
                </div>
                <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <div className="flex items-center mt-2">
                        <span className="inline-flex items-center  w-30 text-neutral-400 text-sm">instagram.com/</span>
                        <Input id="instagram" name="instagram" value={formData.socials.instagram} onChange={handleSocialsChange} placeholder="username" className="rounded-l-none bg-neutral-800 border-neutral-700" />
                    </div>
                </div>
            </div>
          </section>

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" className="text-white border-neutral-700 hover:bg-neutral-800 hover:text-white">Cancel</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold" disabled={updateProfileMutation.isPending}>
              {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>

      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="bg-neutral-900 border-neutral-800 text-white">
          <DialogHeader><DialogTitle>Upload a new photo</DialogTitle><DialogDescription>Drag and drop your image, or click to browse.</DialogDescription></DialogHeader>
          <div
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && fileInputRef.current.click()}
            onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            className={`mt-4 w-full h-64 border-2 border-dashed rounded-lg flex flex-col justify-center items-center cursor-pointer transition-colors ${ isDragging ? 'border-blue-500 bg-blue-900/20' : 'border-neutral-700 hover:border-neutral-600' }`}
            aria-label="Image upload zone"
          >
            <input type="file" accept="image/*" onChange={(e) => handleFileSelect(e.target.files[0])} ref={fileInputRef} className="hidden" />
            {uploadPictureMutation.isPending ? (
              <div className="text-center"><svg className="animate-spin h-8 w-8 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><p className="mt-2 text-sm">Uploading...</p></div>
            ) : (
              <div className="text-center pointer-events-none"><Camera className="mx-auto h-10 w-10 text-neutral-500" /><p className="mt-2 text-sm text-neutral-400"><span className="font-semibold text-blue-500">Click to upload</span> or drag and drop</p><p className="text-xs text-neutral-500 mt-1">PNG, JPG, or GIF</p></div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}