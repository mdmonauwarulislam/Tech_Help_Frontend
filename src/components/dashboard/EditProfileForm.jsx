/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { updateProfile } from "../../redux/slice/userSlice";

const EditProfileForm = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("");
  const [domainOfIntrest, setDomainOfIntrest] = useState([]);
  const [university, setUniversity] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [githubProfile, setGithubProfile] = useState("");
  const [linkedinProfile, setLinkedinProfile] = useState("");
  const [hometown, setHometown] = useState("");
  const [socialPlateform, setSocialPlateform] = useState([]);

  const [listDomainOfIntrest, setListDomainOfIntrest] = useState([]);
  const [listSocialPlateform, setListSocialPlateform] = useState([]);

  // Handle image file selection
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // Handle multi-select domains
  const handleDomainChange = (e) => {
    const selectedOptions = e.target.value;
    if (
      !domainOfIntrest.includes(selectedOptions) &&
      domainOfIntrest.length < 3
    ) {
      setDomainOfIntrest([...domainOfIntrest, selectedOptions]);
    }
  };

  // handle social plateform with link
  const handleSocialPlateform = (item) => {
    let selectedOptions;
    for (let i = 0; i < listSocialPlateform.length; i++) {
      if (listSocialPlateform[i]._id === item) {
        selectedOptions = listSocialPlateform[i];
      }
    }
    if (!socialPlateform.includes(selectedOptions)) {
      setSocialPlateform([...socialPlateform, selectedOptions]);
    }
  };

  const editFormData = new FormData();
  // Handle profile form submission
  const handleUpdateStudentProfile = async (e) => {
    e.preventDefault();

    try {
      editFormData.append("username", username);
      editFormData.append("profilePicture", profileImage.name);
      editFormData.append("profileImage", profileImage);
      editFormData.append("domainOfIntrest", domainOfIntrest);
      editFormData.append("university", university);
      editFormData.append("graduationYear", graduationYear);
      editFormData.append("githubProfile", githubProfile);
      editFormData.append("linkedinProfile", linkedinProfile);
      editFormData.append("hometown", hometown);
      editFormData.append("socialPlateform", socialPlateform);

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/student/upadatestudentdetails`,
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
        dispatch(updateProfile());
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

  // handle get Domain of intrest
  const handleGetDomainOfIntrest = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/get-domain-of-intrest`
      );
      if (response.status === 200) {
        setListDomainOfIntrest(response.data.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  // Remove domain of intrest
  const handleRemoveDomain = (selectedItem) => {
    const updatedDomain = domainOfIntrest.filter(
      (item) => item !== selectedItem
    );
    setDomainOfIntrest(updatedDomain);
  };

  // Handle social plateform
  const handleListSocialPlateform = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/social/getallsocialplateform`
      );
      if (response.status === 200) {
        setListSocialPlateform(response.data.data);
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
        `${import.meta.env.VITE_API_URL}/student/getstudentdetails`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setUsername(response.data.data.username);
        // setProfileImage(response.data.data.profilePicture);
        setDomainOfIntrest(response.data.data.domainOfIntrest);
        setUniversity(response.data.data.university);
        setGraduationYear(response.data.data.graduationYear);
        setHometown(response.data.data.hometown);
        setGithubProfile(response.data.data.githubProfile);
        setLinkedinProfile(response.data.data.linkedinProfile);
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
    handleGetDomainOfIntrest();
    handleListSocialPlateform();
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
              className="py-2 px-4 mt-2 border border-gray-300 rounded-md w-full outline-none"
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
              <label className="font-semibold" htmlFor="domain">
                Which domain are you interested in? (select up to 3)*
              </label>
              <select
                className="py-2 px-4 mt-2 rounded-md border border-gray-300 w-full outline-none"
                id="domain"
                onChange={(e) => handleDomainChange(e)}
                required
              >
                {Array.isArray(listDomainOfIntrest) &&
                  listDomainOfIntrest.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.title}
                    </option>
                  ))}
              </select>
              <div className="md:flex mt-4 gap-2">
                {domainOfIntrest.length > 0 &&
                  domainOfIntrest.map((item, index) => (
                    <div
                      className="border rounded bg-slate-200 py-1 px-3"
                      key={index}
                    >
                      {listDomainOfIntrest.map((listItem) =>
                        listItem._id === item ? listItem.title : null
                      )}{" "}
                      <IoClose
                        onClick={() => handleRemoveDomain(item)}
                        className="inline text-2xl cursor-pointer"
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <label className="font-semibold" htmlFor="university">
                College / University name?
              </label>
              <input
                className="py-2 px-4 mt-2 rounded-md border border-gray-300 w-full outline-none"
                type="text"
                id="university"
                placeholder="Enter your College/University name"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="font-semibold" htmlFor="graduationYear">
                Year of graduation?
              </label>
              <input
                className="py-2 px-4 mt-2 rounded-md border border-gray-300 w-full outline-none"
                type="text"
                id="graduationYear"
                placeholder="Enter year of graduation"
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="font-semibold" htmlFor="github">
                Github Profile Link
              </label>
              <input
                className="py-2 px-4 mt-2 rounded-md border border-gray-300 w-full outline-none"
                type="text"
                id="githubProfile"
                placeholder="Enter your Github profile link"
                value={githubProfile}
                onChange={(e) => setGithubProfile(e.target.value)}
              />
            </div>

            <div>
              <label className="font-semibold" htmlFor="linkedin">
                LinkedIn Profile Link
              </label>
              <input
                className="py-2 px-4 mt-2 rounded-md border border-gray-300 w-full outline-none"
                type="text"
                id="linkedinProfile"
                placeholder="Enter your LinkedIn profile link"
                value={linkedinProfile}
                onChange={(e) => setLinkedinProfile(e.target.value)}
              />
            </div>

            <div>
              <label className="font-semibold" htmlFor="domain">
                Add your Social Plateform Links
              </label>
              <select
                className="py-2 px-4 mt-2 rounded-md border border-gray-300 w-full outline-none"
                id="domain"
                onChange={(e) => handleSocialPlateform(e.target.value)}
                required
              >
                {Array.isArray(listSocialPlateform) &&
                  listSocialPlateform.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
              <div className="md:flex mt-4 gap-2">
                {socialPlateform.map((item, index) => (
                  <div key={index}>
                    <label htmlFor="">{item.name}</label>
                    <input
                      type="text"
                      className="py-2 px-4 mt-2 rounded-md border border-gray-300 w-full "
                      placeholder={`${item.link}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold">Enter your hometown</label>
              <input
                className="py-2 px-4 mt-2 rounded-md border border-gray-300 w-full outline-none"
                type="text"
                id="githubProfile"
                placeholder="Enter your hometown"
                value={hometown}
                onChange={(e) => setHometown(e.target.value)}
              />
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
              onClick={handleUpdateStudentProfile}

            >
              Save Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
