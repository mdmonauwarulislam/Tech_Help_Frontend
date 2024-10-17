import { useEffect, useState } from "react";
import profile from "../../assets/profile.webp";
import AddNewEducationDetails from "../../components/dashboard/AddNewEducationDetails";
import AddProjectDetails from "../../components/dashboard/AddProjectDetails";
import AddResponsibilityDeatils from "../../components/dashboard/AddResponsibilityDeatils";
import AddExperienceDeatils from "../../components/dashboard/AddExperienceDeatils";
import AddAchievement from "../../components/dashboard/AddAchievement";
import AddCertifications from "../../components/dashboard/AddCertifications";

import EditProfileForm from "../../components/dashboard/EditProfileForm";
import axios from "axios";
import { useSelector } from "react-redux";

function UserDashboard() {
  const isUpdateProfile = useSelector((state) => state.user.isProfileUpdated);
  const [activeLink, setActiveLink] = useState("Education");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [domainOfIntrest, setDomainOfIntrest] = useState([]);
  const [university, setUniversity] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [hometstate, setHometstate] = useState("");
  const [githubProfile, setGithubProfile] = useState("");
  const [linkedinProfile, setLinkedinProfile] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const links = [
    "Education",
    "Projects",
    "Position of Responsibility",
    "Work Experience",
    "Achievements",
    "Certifications",
  ];

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
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
        setProfilePicture(response.data.data.profilePicture);
        setDomainOfIntrest(response.data.data.domainOfIntrest);
        setUniversity(response.data.data.university);
        setGraduationYear(response.data.data.graduationYear);
        setHometstate(response.data.data.hometstate);
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
  }, []);
  useEffect(() => {
    handleViewProfile();
  }, [isUpdateProfile]);
  return (
    <div className="mx-auto  md:flex justify-center p-10 gap-8">
      <div className="w-8/12">
        <div className="border-2 rounded-xl">
          <div className="">
            <div className="flex px-10 pt-10 items-center pb-5 justify-between">
              <div className="flex gap-10 ">
                <div>
                  <img
                    src={`${
                      import.meta.env.VITE_API_URL
                    }/uploads/${profilePicture}`}
                    className="h-20 w-20 rounded-full border-4 border-white"
                    alt=""
                  />
                </div>
                <div className="">
                  <h1 className="text-2xl font-semibold">{username}</h1>
                  {domainOfIntrest.map((domainItem) => (
                    <p className="text-[18px]" key={domainItem._id}>
                      {domainItem.title}
                    </p>
                  ))}
                  {/* <p className="text-[18px]">{domainOfIntrest}</p> */}
                  <p className="text-[16px] pr-6">
                    {university} | 
                    <span className="ml-2">{graduationYear}</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={openModal}
                  className="px-4 font-semibold py-1 bg-primary rounded text-white"
                >
                  Edit
                </button>
                <EditProfileForm isOpen={isModalOpen} onClose={closeModal} />
                <button className="px-4 font-semibold py-1 bg-primary rounded text-white">
                  Your resume
                </button>
              </div>
            </div>
            <div
              className="flex justify-between px-10 overflow-scroll"
              style={{
                scrollbarWidth: "none",
              }}
            >
              {links.map((link) => (
                <p
                  key={link}
                  className={`cursor-pointer ${
                    activeLink === link
                      ? "text-techBlue-500 border-b-2 border-techBlue-500 py-5"
                      : "hover:text-techBlue-500 hover:border-b-2 py-5 hover:border-techBlue-500"
                  }`}
                  onClick={() => handleLinkClick(link)}
                >
                  {link}
                </p>
              ))}
            </div>
          </div>
        </div>
        {activeLink === "Education" && (
          <div>
            <div className="py-4">
              <AddNewEducationDetails />
            </div>
          </div>
        )}
        {activeLink === "Projects" && (
          <div>
            <div className="py-4">
              <AddProjectDetails />
            </div>
          </div>
        )}
        {activeLink === "Position of Responsibility" && (
          <div>
            <div className="py-4">
              <AddResponsibilityDeatils />
            </div>
          </div>
        )}
        {activeLink === "Work Experience" && (
          <div>
            <div className="py-4">
              <AddExperienceDeatils />
            </div>
          </div>
        )}
        {activeLink === "Achievements" && (
          <div>
            <div className="py-4">
              <AddAchievement />
            </div>
          </div>
        )}
        {activeLink === "Certifications" && (
          <div>
            <div className="py-4">
              <AddCertifications />
            </div>
          </div>
        )}
      </div>

      <div className="w-4/12 ">
        <div className="border-2 rounded-xl h-10"></div>
      </div>
    </div>
  );
}

export default UserDashboard;
