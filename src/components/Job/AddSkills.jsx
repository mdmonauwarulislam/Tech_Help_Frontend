import { useState, useEffect, useCallback } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";

const AddSkills = ({
  isSkillFormOpen,
  onSkillFormClose,
  skills,
  setSkills,
}) => {
  const [searchSkill, setSearchSkill] = useState("");
  const [availableSkills, setAvailableSkills] = useState([]);
  const [displaySkills, setDisplaySkills] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all skills from the backend
  const fetchSkills = async () => {
    setLoading(true);
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
      toast.error("Error fetching skills. Please try again later.");
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced skill search
  const handleSearch = useCallback(
    debounce((value) => {
      if (!value) {
        setDisplaySkills([]);
        return;
      }
      const filteredSkills = availableSkills.filter((skill) =>
        skill.toLowerCase().includes(value.toLowerCase())
      );
      setDisplaySkills(filteredSkills);
    }, 300),
    [availableSkills]
  );

  const onSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchSkill(value);
    handleSearch(value);
  };

  // Add a selected skill to the user's skill list
  const handleSkillSelect = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
      toast.success(`Added skill: ${skill}`);
    } else {
      toast.warning(`Skill "${skill}" is already added.`);
    }
    setSearchSkill("");
    setDisplaySkills([]);
  };

  // Remove a skill from the user's skill list
  const handleSkillRemove = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
    toast.info(`Removed skill: ${skill}`);
  };

  useEffect(() => {
    if (isSkillFormOpen) fetchSkills();
  }, [isSkillFormOpen]);

  if (!isSkillFormOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Manage Your Skills</h2>
          <button onClick={onSkillFormClose} aria-label="Close">
            <RxCross2 className="text-2xl" />
          </button>
        </div>

        {/* Skill Search and Add */}
        <div className="mb-4">
          <label htmlFor="skill-search" className="font-medium">
            Search & Add Skills
          </label>
          <input
            id="skill-search"
            type="text"
            value={searchSkill}
            onChange={onSearchInputChange}
            className="w-full mt-2 p-2 border rounded"
            placeholder="Search for skills"
            aria-label="Search for skills"
          />
          {loading ? (
            <p className="mt-2 text-gray-500">Loading skills...</p>
          ) : (
            <div className="mt-2">
              {displaySkills.map((skill) => (
                <button
                  key={skill}
                  className="bg-gray-200 px-3 py-1 rounded-full m-1"
                  onClick={() => handleSkillSelect(skill)}
                  aria-label={`Add ${skill}`}
                >
                  {skill}
                </button>
              ))}
            </div>
          )}
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
                aria-label={`Remove ${skill}`}
              >
                {skill}
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
            onClick={onSkillFormClose}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSkills;
