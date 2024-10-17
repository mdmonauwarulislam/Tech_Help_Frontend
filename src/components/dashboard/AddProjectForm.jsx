/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { FiDelete } from "react-icons/fi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { handleIsUpdatedProject } from "../../redux/slice/projectSlice";

const AddProjectForm = ({ isOpen, onClose, projectToEdit }) => {
  const dispatch = useDispatch();
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState(["", "", ""]); // 3 mandatory fields
  const [projectSkills, setProjectSkills] = useState("");
  const [selectedLinkType, setSelectedLinkType] = useState("");
  const [projectLinks, setProjectLinks] = useState([]);

  useEffect(() => {
    // Reset form fields when opening the modal
    if (isOpen) {
      if (projectToEdit) {
        setProjectTitle(projectToEdit.title);
        setProjectDescription(projectToEdit.description);
        setProjectSkills(projectToEdit.skills.join(", "));
        setProjectLinks(projectToEdit.links);
      } else {
        setProjectTitle("");
        setProjectDescription(["", "", ""]); // Reset to default
        setProjectSkills("");
        setProjectLinks([]);
      }
    }
  }, [isOpen, projectToEdit]);

  if (!isOpen) return null;

  const handleProjectTitleChange = (e) => {
    setProjectTitle(e.target.value);
  };

  const handleDescriptionChange = (index, value) => {
    const newDescription = [...projectDescription];
    newDescription[index] = value;
    setProjectDescription(newDescription);
  };

  const addNewDescriptionPoint = () => {
    setProjectDescription([...projectDescription, ""]);
  };

  const deleteDescriptionPoint = (index) => {
    if (index >= 3) {
      const newDescription = projectDescription.filter((_, i) => i !== index);
      setProjectDescription(newDescription);
    } else {
      toast.error("You cannot delete the first 3 mandatory description fields.");
    }
  };

  const handleLinkTypeChange = (e) => {
    const type = e.target.value;
    setSelectedLinkType(type);
    if (type) {
      setProjectLinks([...projectLinks, { linkTitle: type, value: "" }]);
      setSelectedLinkType("");
    }
  };

  const handleLinkChange = (index, value) => {
    const newLinks = [...projectLinks];
    newLinks[index].value = value;
    setProjectLinks(newLinks);
  };

  const deleteLink = (index) => {
    const newLinks = projectLinks.filter((_, i) => i !== index);
    setProjectLinks(newLinks);
  };

  const validateForm = () => {
    if (!projectTitle.trim()) {
      toast.error("Project title is required.");
      return false;
    }

    if (projectDescription.slice(0, 3).some((desc) => !desc.trim())) {
      toast.error("The first 3 description points are mandatory.");
      return false;
    }

    const skillsArray = projectSkills.split(",").map((skill) => skill.trim()).filter((skill) => skill);
    if (skillsArray.length < 3) {
      toast.error("Please enter at least 3 skills, separated by commas.");
      return false;
    }

    return { title: projectTitle, description: projectDescription, skills: skillsArray, links: projectLinks };
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const projectDetails = validateForm();
    if (!projectDetails) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/student/addProject`,
        projectDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        dispatch(handleIsUpdatedProject());
        toast.success("Project added successfully!");
        onClose(); // Close the form after submission
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Something went wrong while adding the project.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const projectDetails = validateForm();
    if (!projectDetails) return;

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/student/updateProject/${projectToEdit._id}`,
        projectDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        dispatch(handleIsUpdatedProject());
        toast.success("Project updated successfully!");
        onClose(); // Close the form after submission
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Something went wrong while updating the project.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="bg-white p-10 shadow-md rounded-md z-10 relative w-11/12 md:w-2/3 lg:w-1/2 max-h-screen overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute text-3xl top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>

        <h4 className="text-lg font-bold mb-4">Project Details</h4>

        <div className="mb-5">
          <label className="font-semibold" htmlFor="title">
            Project Title*
          </label>
          <input
            className="py-2 px-4 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
            type="text"
            id="title"
            name="title"
            placeholder="Enter Project Name"
            value={projectTitle}
            onChange={handleProjectTitleChange}
            required
          />
        </div>

        <div className="mb-5">
          <label className="font-semibold" htmlFor="description">
            Description (3 points required)*
          </label>
          {projectDescription.map((desc, index) => (
            <div key={index} className="relative mb-2">
              <input
                className="py-2 text-[16px] px-4 pr-10 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
                type="text"
                placeholder={
                  index === 0
                    ? "Enter Goal of the project"
                    : index === 1
                    ? "Enter process of the project"
                    : index === 2
                    ? "Enter details features of the project"
                    : "Type something....."
                }
                value={desc}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                required={index < 3} // Only the first 3 are required
              />
              {index >= 3 && (
                <button
                  type="button"
                  onClick={() => deleteDescriptionPoint(index)}
                  className="absolute right-4 text-2xl top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <FiDelete />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addNewDescriptionPoint}
            className="mt-3 text-techBlue-500 hover:text-techBlue-700"
          >
            + Add new point
          </button>
        </div>

        <div className="mb-5">
          <label className="font-semibold">Project Links (Optional)</label>
          <select
            value={selectedLinkType}
            onChange={handleLinkTypeChange}
            className="py-2 px-4 mt-2 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
          >
            <option value="">Select link type</option>
            <option value="video">Project Video</option>
            <option value="repository">Repository</option>
            <option value="deployed">Deployed Link</option>
            <option value="certificate">Certificate Link</option>
            <option value="other">Other</option>
          </select>

          {projectLinks.map((link, index) => (
            <div key={index} className="relative mt-2">
              <input
                className="py-2 px-4 pr-10 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
                type="text"
                placeholder={`Enter ${link.linkTitle} link`}
                value={link.value}
                onChange={(e) => handleLinkChange(index, e.target.value)}
              />
              <button
                type="button"
                onClick={() => deleteLink(index)}
                className="absolute right-4 text-2xl top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <FiDelete />
              </button>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <label className="font-semibold" htmlFor="skills">
            Skills (Separate by commas, at least 3)*
          </label>
          <input
            className="py-2 px-4 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
            type="text"
            id="skills"
            placeholder="Enter skills, separated by commas"
            value={projectSkills}
            onChange={(e) => setProjectSkills(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-between">
          <button
            className="bg-techBlue-500 text-white py-2 px-4 rounded-md hover:bg-techBlue-700"
            onClick={projectToEdit ? handleUpdate : handleSave}
          >
            {projectToEdit ? "Update Project" : "Add Project"}
          </button>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProjectForm;
