/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FiDelete } from "react-icons/fi";

const AddProjectForm = ({ isOpen, onClose }) => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState(['', '', '']);
  const [projectSkills, setProjectSkills] = useState('');
  const [selectedLinkType, setSelectedLinkType] = useState('');
  const [projectLinks, setProjectLinks] = useState([]); 

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
    setProjectDescription([...projectDescription, '']);
  };

  const deleteDescriptionPoint = (index) => {
    const newDescription = projectDescription.filter((_, i) => i !== index);
    setProjectDescription(newDescription);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const projectDetails = {
      title: projectTitle,
      description: projectDescription,
      skills: projectSkills,
      links: projectLinks,
    };
    console.log(projectDetails);
  };

  const handleLinkTypeChange = (e) => {
    const type = e.target.value;
    setSelectedLinkType(type);
    if (type) {
      setProjectLinks([...projectLinks, { type, value: '' }]);
      setSelectedLinkType(''); 
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background blur */}
      <div
        className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="bg-white p-10 shadow-md rounded-md z-10 relative w-11/12 md:w-2/3 lg:w-1/2 max-h-screen overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute text-3xl top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>

        <h4 className="text-lg font-bold mb-4">Project Details</h4>

        {/* Project Title */}
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

        {/* Project Description */}
        <div className="mb-5">
          <label className="font-semibold" htmlFor="description">
            Description (min 3 points)*
          </label>
          {projectDescription.map((desc, index) => (
            <div key={index} className="relative mb-2">
              <input
                className="py-2 text-[16px] px-4 pr-10 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
                type="text"
                placeholder={
                  index === 0
                    ? 'Enter Goal of the project'
                    : index === 1
                    ? 'Enter process of the project'
                    : index === 2
                    ? 'Enter details features of the project'
                    : 'Type something.....'
                }
                value={desc}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                required={index < 3} 
              />
              {/* Delete icon for points from the 4th onwards */}
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

        {/* Project Links */}
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
                placeholder={`Enter ${link.type} link`}
                value={link.value}
                onChange={(e) => handleLinkChange(index, e.target.value)}
              />
              <button
                type="button"
                onClick={() => deleteLink(index)}
                className="absolute right-4 text-2xl  top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <FiDelete />
              </button>
            </div>
          ))}
        </div>

        {/* Skills Used */}
        <div className="mb-5">
          <label className="font-semibold">Skills Used (min 3 skills)*</label>
          <input
            className="py-2 px-4 mt-2 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
            type="text"
            placeholder="Type skills used"
            value={projectSkills}
            onChange={(e) => setProjectSkills(e.target.value)}
            required
          />
        </div>

        {/* Save and Cancel Buttons */}
        <div className="pt-5 gap-10 flex justify-end">
          <button onClick={onClose} className="text-gray-500">Cancel</button>
          <button
            onClick={handleSave}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-techBlue-600 focus:outline-none"
          >
            Save Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProjectForm;
