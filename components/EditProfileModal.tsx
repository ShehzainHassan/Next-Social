"use client";
import { useUser } from "@/utils/contexts/UserContext";
import React, { useState } from "react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal = ({ isOpen, onClose }: EditProfileModalProps) => {
  const { user } = useUser();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(user?.password || "");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const [errors, setErrors] = useState({
    firstName: false,
    email: false,
    password: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      firstName: firstName.trim() === "",
      email: email.trim() === "",
      password: password.trim() === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    console.log("Profile updated:", {
      firstName,
      lastName,
      email,
      password,
      bio,
      image,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray3 bg-opacity-50 dark:bg-gray6 dark:bg-opacity-80 flex items-center justify-center z-50"
          onClick={onClose}>
          <div
            className="bg-white dark:bg-gray8 text-gray6 dark:text-white p-6 rounded-lg w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <button
                onClick={onClose}
                className="text-gray7 dark:text-gray2 hover:text-gray6 dark:hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray5 dark:text-gray2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`w-full mt-1 p-2 border ${
                      errors.firstName ? "border-red1" : "border-gray2"
                    } dark:border-gray7 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue2 dark:bg-gray5 dark:text-white`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red1 text-sm mt-1">
                      First name cannot be empty
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray5 dark:text-gray2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray2 dark:border-gray7 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue2 dark:bg-gray5 dark:text-white"
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray5 dark:text-gray2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full mt-1 p-2 border ${
                      errors.email ? "border-red1" : "border-gray2"
                    } dark:border-gray7 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue2 dark:bg-gray5 dark:text-white`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red1 text-sm mt-1">
                      Email cannot be empty
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray5 dark:text-gray2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full mt-1 p-2 border ${
                      errors.password ? "border-red1" : "border-gray2"
                    } dark:border-gray7 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue2 dark:bg-gray5 dark:text-white`}
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="text-red1 text-sm mt-1">
                      Password cannot be empty
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray5 dark:text-gray2">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray2 dark:border-gray7 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue2 dark:bg-gray5 dark:text-white"
                    rows={4}
                    placeholder="Write a short bio"
                  />
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray5 dark:text-gray2">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full mt-1 border border-gray2 dark:border-gray7 rounded-lg p-2"
                  />
                  {image && (
                    <div className="mt-2">
                      <img
                        src={image}
                        alt="Profile preview"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray7 dark:text-gray2 border border-gray2 dark:border-gray7 rounded-lg hover:bg-gray-100 dark:hover:bg-gray5 focus:outline-none">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={Object.values(errors).some((error) => error)}
                  className={`px-4 py-2 text-sm font-medium text-white ${
                    Object.values(errors).some((error) => error)
                      ? "bg-gray2 cursor-not-allowed"
                      : "bg-blue3 hover:bg-blue4"
                  } rounded-lg focus:outline-none`}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfileModal;
