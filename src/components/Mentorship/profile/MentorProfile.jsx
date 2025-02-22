import { useState, useEffect } from "react";
import axios from "axios";
import EditProfileModal from "./EditProfileModal";
import AddEducation from "./AddEducation";
import { BiLoader } from "react-icons/bi";
import AddExperience from "./AddExperience";
import userimg from "../../../assets/userpng.jpg";

const MentorProfile = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [about, setAbout] = useState("");
  const [experties, setExperties] = useState("");
  const [company, setCompany] = useState("");
  const [yearofexperience, setYearofexperience] = useState(null);
  // const [skills, setSkills] = useState([]);
  const [activeModal, setActiveModal] = useState(null);

  const openProfileModal = () => setActiveModal("profile");
  // const openSkillsModal = () => setActiveModal("skills");
  const closeModal = () => setActiveModal(null);

  const handleFetchMentorDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/mentor/profile`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        setUsername(response.data.data.username);
        setProfilePicture(response.data.data.profilePicture);
        setAbout(response.data.data.about);
        setExperties(response.data.data.experties);
        setCompany(response.data.data.company);
        setYearofexperience(response.data.data.yearofexperience);
      }
    } catch (error) {
      console.error("Error fetching mentor data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await handleFetchMentorDetails();
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BiLoader className="animate-spin h-10 w-10 mx-auto" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="border-2 rounded-xl">
        <div className="">
          <div className="flex px-10 py-10 items-center justify-between bg-white rounded-3xl border-2 border-gray-100 shadow-md">
            <div className="flex gap-10 justify-start items-center">
              <div>
                <img
                  src={`${
                    profilePicture
                      ? `${
                          import.meta.env.VITE_API_URL
                        }/uploads/${profilePicture}`
                      : userimg
                  }`}
                  className="h-32 w-32 rounded-full border-2 border-collapse border-primary"
                  alt="Profile"
                />
              </div>
              <div className="">
                <h1 className="text-4xl font-semibold text-primary">{username}</h1>
                {experties && experties.length > 0 ? (
                  <p className="text-xl">{experties}</p>
                ) : (
                  <p className="text-gray-700 italic">
                    Add experties using edit profile
                  </p>
                )}
                  <div className="flex gap-2">
                  <h1 className="text-lg font-medium">@ {company}</h1>
                  <div className="border-r-2 border-gray-500 h-7"></div>
                  <div>
                  {yearofexperience !== null && yearofexperience > 0 ? (
                    <p className="text-lg font-normal">{yearofexperience}+ Year of experience</p>
                  ) : (
                    <p className="text-gray-700 italic">
                      Fresher
                    </p>
                  )}
                  </div>
                  </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={openProfileModal}
                className="px-6 py-2 text-xl bg-primary rounded-md text-white"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* about section */}
      <div className="mt-10 border-2">
        <h3 className="text-2xl font-semibold text-primary px-2">About</h3>
        {about && about.length > 0 ? (
          <p className="text-lg p-2 text-justify leading-7 tracking-tight">{about}</p>
        ) : (
          <p className="text-gray-700 italic p-2">Add about yourself</p>
        )}
      </div>

      {/* Skills section */}
      {/* <div className="mt-4 border-2">
        <h3 className="text-lg font-semibold">Skills</h3>
        {skills && skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill._id}
                className="border-2 border-gray-900 rounded-xl p-2"
              >
                {skill.title}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 italic p-2">Add skills using edit profile</p>
        )}
      </div> */}

      <div>
        <div className="py-4">
          <AddEducation />
        </div>
      </div>

      <div>
        <div className="py-4">
          <AddExperience />
        </div>
      </div>

      {activeModal === "profile" && (
        <EditProfileModal isOpen={true} onClose={closeModal} />
      )}
    </div>
  );
};

export default MentorProfile;
