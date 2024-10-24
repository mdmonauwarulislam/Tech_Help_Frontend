import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";

const EditSkills = ({
  isSkillFormOpen,
  onSkillFormClose,
  initialTagline,
  initialSkills,
}) => {
  const [tagline, setTagline] = useState(initialTagline || "");
  const [skills, setSkills] = useState([
    tagline,
    
  ]);
  const [searchSkill, setSearchSkill] = useState("");
  const [availableSkills, setAvailableSkills] = useState([]);
  const [displaySkills, setDisplaySkills] = useState([]);
  const [showSkills, setShowSkills] = useState(false);

  // Update the skills and tagline in user profile
  const handleUpdateSkills = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/student/updateStudentSkills`,
        {
          skills: skills,
          tagline: tagline,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Skills updated successfully");
        onSkillFormClose();
      }
    } catch (error) {
      toast.error("Error updating skills", error);
    }
  };

  // Fetch all skills from the backend
  const fetchSkills = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/getAllSkills`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = response.data?.data || [];
      setAvailableSkills(data.map((skillObj) => skillObj.skills));
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  // Handle skill search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchSkill(value);
    if (!value) {
      setShowSkills(false);
      setDisplaySkills([]);
    } else {
      setShowSkills(true);

      const filteredSkills = availableSkills.filter((skill) =>
        skill.toLowerCase().includes(value.toLowerCase())
      );
      setDisplaySkills(filteredSkills);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Add a selected skill to the user's skill list
  const handleSkillSelect = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setSearchSkill(""); 
  };

  // Remove a skill from the user's skill list
  const handleSkillRemove = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  if (!isSkillFormOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg w-1/3">
        <h2 className="text-xl font-semibold mb-5">Edit Tagline and Skills</h2>

        {/* Tagline Input */}
        <div className="mb-4">
          <label className="font-medium">Tagline</label>
          <input
            type="text"
            name="tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full mt-2 p-2 border rounded"
            placeholder="Enter your tagline"
          />
        </div>

        {/* Skill Search and Add */}
        <div className="mb-4">
          <label className="font-medium">Search & Add Skills</label>
          <input
            type="text"
            name="skills"
            value={searchSkill}
            onChange={(e) => handleSearch(e)}
            className="w-full mt-2 p-2 border rounded"
            placeholder="Search for skills"
          />
          {/* Displaying available skills for selection */}
          <div className="mt-2">
            {showSkills &&
              displaySkills.map((skill) => (
                <button
                  key={skill}
                  className="bg-gray-200 px-3 py-1 rounded-full m-1"
                  onClick={() => handleSkillSelect(skill)}
                >
                  {skill}
                </button>
              ))}
          </div>
        </div>

        {/* Selected Skills */}
        <div className="mb-4">
          <label className="font-medium">Selected Skills</label>
          <div className="flex gap-2 flex-wrap mt-2">
            {skills.map((skill) => (
              <button
                key={skill}
                className="bg-gray-200 px-4 py-2 rounded-full"
                onClick={() => handleSkillRemove(skill)}
              >
                {skill}{" "}
                <span className="ml-2">
                  <RxCross2 className="inline" />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-5">
          <button
            onClick={onSkillFormClose}
            className="bg-gray-300 px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateSkills}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSkills;
