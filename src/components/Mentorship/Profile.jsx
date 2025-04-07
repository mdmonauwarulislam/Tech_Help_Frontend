import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProfileCard from "./ProfileCard";
import EducationDetails from "./EducationDetails";
import ExperienceDetails from "./ExperienceDetails";
import ServicesDetails from "./ServicesDetails";

const Profile = () => {
  const { mentorId } = useParams();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState("services");

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/mentor/me/${mentorId}`);
        setMentor(response.data.data);
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, [mentorId]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!mentor) return <div className="text-center py-10">Mentor not found</div>;

  return (
    <div className="min-h-screen flex max-w-7xl mx-auto my-8 gap-10">
      {/* Left: Profile Card */}
      <div className="w-[35%] bg-white rounded-lg">
        <ProfileCard mentor={mentor} setSelectedSection={setSelectedSection} />
      </div>

      {/* Right: Services */}
      <div className="w-3/5 bg-white p-6 rounded-lg ">
        {selectedSection === "education" && (<EducationDetails education={mentor.education} />)}
        {selectedSection === "experience" && (<ExperienceDetails experience={mentor.experience} />)}
        {selectedSection === "services" && (<ServicesDetails services={mentor.services} />)}
      </div>
    </div>
  );
};

export default Profile;
