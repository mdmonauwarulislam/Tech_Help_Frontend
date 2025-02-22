/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const EditProfileModal = ({ isOpen, onClose }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("");
  const [experties, setExperties] = useState("");
  const [about, setAbout] = useState("");
  const [company, setCompany] = useState("");
  const [yearofexperience, setYearofexperience] = useState(null);
  
  // Handle image file selection
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const editFormData = new FormData();
  const handleUpdateStudentProfile = async (e) => {
    e.preventDefault();
    
    try {
      editFormData.append("username", username);
      editFormData.append("profilePicture", profileImage.name);
      editFormData.append("profileImage", profileImage);
      editFormData.append("about", about);
      editFormData.append("experties", experties);
      editFormData.append("company", company);
      editFormData.append("yearofexperience", yearofexperience);
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/mentor/profile/update`,
        editFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully");
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  //handle View Profile
  const handleViewProfile = async () => {
    console.log(localStorage.getItem("token"));
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/mentor/profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setUsername(response.data.data.username);
        setExperties(response.data.data.experties);
        setAbout(response.data.data.about);
        setCompany(response.data.data.company);
        setYearofexperience(response.data.data.yearofexperience);

      }
    } catch (error) {
      console.error(error);
      console.error(
        "Error fetching profile:",
        error.response ? error.response.data : error.message
      );
    }
  };
  useEffect(() => {
    handleViewProfile();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 z-10 max-h-screen overflow-hidden">
        <form
          className="max-h-[80vh] overflow-y-auto py-4"
          style={{
            scrollbarWidth: "none",
          }}
          onSubmit={handleUpdateStudentProfile}
        >
          <button
            onClick={onClose}
            className="absolute text-3xl top-3 right-3 text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>

          <div className="mb-5">
            <label className="font-semibold">
              Profile Picture (Should be less than 2MB)
            </label>
            {profileImage && (
              <div className="my-3">
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-full border"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="py-2 px-4 mt-2 border border-gray-900 rounded-md w-full outline-none"
              onChange={handleImageChange}
            />
          </div>

          <div className="space-y-5">
            <div>
              <label className="font-semibold" htmlFor="fullName">
                Your full name?*
              </label>
              <input
                className="py-2 px-4 mt-2 rounded-md border border-gray-300 w-full outline-none"
                type="text"
                id="fullName"
                placeholder="Enter your Full Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="font-semibold" htmlFor="experties">
                Your experties?*
              </label>
              <input
                className="py-2 px-4 mt-2 rounded-md border border-gray-300 w-full outline-none"
                type="text"
                id="experties"
                placeholder="Enter your experties"
                value={experties}
                onChange={(e) => setExperties(e.target.value)}
                required
              />

            </div>
            <div>
              <label className="font-semibold" htmlFor="company">
                Your company?*
              </label>
              <input
                className="py-2 px-4 mt-2 rounded-md border border-gray-300 w-full outline-none"
                type="text"
                id="company"
                placeholder="Enter your company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />

            </div>

            <div>
              <label className="font-semibold" htmlFor="yearofexperience">
                Your experience?*
              </label>
              <input
                className="py-2 px-4 mt-2 rounded-md border border-gray-300 w-full outline-none"
                type="number"
                id="yearofexperience"
                placeholder="Enter your experience"
                value={yearofexperience}
                onChange={(e) => setYearofexperience(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="font-semibold" htmlFor="about">
                About you
              </label>
              <textarea
                className="py-2 px-4 mt-2 rounded-md border border-gray-300 w-full outline-none"
                id="about"
                placeholder="Write about yourself"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>

          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="py-2 px-4 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              className="py-2 px-4 bg-primary text-white rounded-md"
              type="submit"
            >
              Save Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
