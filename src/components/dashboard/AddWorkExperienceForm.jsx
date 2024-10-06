/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FiDelete } from "react-icons/fi";

const AddWorkExperienceForm = ({ isOpen, onClose }) => {
  const [companyName, setCompanyName] = useState('');
  const [internshipType, setInternshipType] = useState('');
  const [companyLink, setCompanyLink] = useState('');
  const [internshipTitle, setInternshipTitle] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [projectDetails, setProjectDetails] = useState(['', '', '']); // For project, contribution, features
  const [skillsUsed, setSkillsUsed] = useState('');
  const [certificateLink, setCertificateLink] = useState('');


  if (!isOpen) return null;

  const handleProjectChange = (index, value) => {
    const newProjectDetails = [...projectDetails];
    newProjectDetails[index] = value;
    setProjectDetails(newProjectDetails);
  };

  const addNewProjectPoint = () => {
    setProjectDetails([...projectDetails, '']);
  };

  const deleteProjectPoint = (index) => {
    const newProjectDetails = projectDetails.filter((_, i) => i !== index);
    setProjectDetails(newProjectDetails);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const workExperienceDetails = {
      companyName,
      internshipType,
      companyLink,
      internshipTitle,
      location,
      startDate,
      endDate,
      currentlyWorking,
      projectDetails,
      skills: skillsUsed.split(',').map(skill => skill.trim()), 
      certificateLink,
    };
    console.log(workExperienceDetails);
    // Reset form or handle successful submission
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

        <h4 className="text-lg font-bold mb-4">Work Experience</h4>

        {/* Company Name */}
        <div className="mb-5">
          <label className="font-semibold" htmlFor="companyName">
            Company Name*
          </label>
          <input
            className="py-2 px-4 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
            type="text"
            id="companyName"
            placeholder="Type company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>

        {/* Internship Type */}
        <div className="mb-5">
          <label className="font-semibold" htmlFor="internshipType">
            Internship or Job Type*
          </label>
          <select
            id="internshipType"
            className="py-2 px-4 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
            value={internshipType}
            onChange={(e) => setInternshipType(e.target.value)}
            required
          >
            <option value="">Select Internship Type</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="remote">Remote</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Company Website / LinkedIn */}
        <div className="mb-5">
          <label className="font-semibold">Company Website / LinkedIn (Optional)</label>
          <input
            className="py-2 px-4 mt-2 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
            type="text"
            placeholder="Enter Company Link"
            value={companyLink}
            onChange={(e) => setCompanyLink(e.target.value)}
          />
        </div>

        {/* Internship or Job Title */}
        <div className="mb-5">
          <label className="font-semibold" htmlFor="internshipTitle">
            Internship Or Job Title*
          </label>
          <input
            className="py-2 px-4 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
            type="text"
            id="internshipTitle"
            placeholder="Enter Internship Title"
            value={internshipTitle}
            onChange={(e) => setInternshipTitle(e.target.value)}
            required
          />
        </div>

        {/* Location */}
        <div className="mb-5">
          <label className="font-semibold" htmlFor="location">
            Location*
          </label>
          <input
            className="py-2 px-4 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
            type="text"
            id="location"
            placeholder="Type Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        {/* Start and End Dates */}
        <div className="mb-5 grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold" htmlFor="startDate">
              Start Date*
            </label>
            <input
              className="py-2 px-4 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
              type="text"
              id="startDate"
              placeholder="dd-mm-yyyy"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="font-semibold" htmlFor="endDate">
              End Date*
            </label>
            <input
              className="py-2 px-4 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
              type="text"
              id="endDate"
              placeholder="dd-mm-yyyy"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              disabled={currentlyWorking}
            />
          </div>
        </div>

        {/* Currently Working Here Checkbox */}
        <div className="mb-5 flex items-center">
          <input
            type="checkbox"
            id="currentlyWorking"
            checked={currentlyWorking}
            onChange={() => setCurrentlyWorking(!currentlyWorking)}
            className="mr-2"
          />
          <label className="font-semibold" htmlFor="currentlyWorking">
            Currently working here
          </label>
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="font-semibold" htmlFor="description">
            Description (Answer below questions to describe your work properly)*
          </label>
          {projectDetails.map((detail, index) => (
            <div key={index} className="relative mb-2">
              <input
                className="py-2 px-4 pr-10 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
                type="text"
                placeholder={index === 0 ? 'Enter details of project' : index === 1 ? 'Enter your contribution' : 'Enter details of features'}
                value={detail}
                onChange={(e) => handleProjectChange(index, e.target.value)}
                required
              />
              {/* Delete icon */}
              {index >= 3 && (
                <button
                  type="button"
                  onClick={() => deleteProjectPoint(index)}
                  className="absolute text-2xl right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <FiDelete />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addNewProjectPoint}
            className="mt-3 text-gray-700 border-2 w-full py-2 rounded-md font-semibold"
          >
            + New point
          </button>
        </div>

        {/* Skills Used */}
        <div className="mb-5">
          <label className="font-semibold">Skills Used (min 3 skills)*</label>
          <input
            className="py-2 px-4 mt-2 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
            type="text"
            placeholder="Type Skills Used (comma separated)"
            value={skillsUsed}
            onChange={(e) => setSkillsUsed(e.target.value)}
            required
          />
        </div>

        {/* Certificate Link */}
        <div className="mb-5">
          <label className="font-semibold">Certificate Link (Optional)</label>
          <input
            className="py-2 px-4 mt-2 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
            type="text"
            placeholder="Certificate/ LOR link"
            value={certificateLink}
            onChange={(e) => setCertificateLink(e.target.value)}
          />
        </div>
        {/* Save and Cancel Buttons */}
        <div className="pt-5 gap-10 flex justify-end">
          <button onClick={onClose} className="text-gray-500">Cancel</button>
          <button
            onClick={handleSave}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-techBlue-600 focus:outline-none"
          >
            Save Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWorkExperienceForm;
