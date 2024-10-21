/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { FiDelete } from "react-icons/fi";
import axios from 'axios';
import { toast } from 'react-toastify';

const AddWorkExperienceForm = ({ isOpen, onClose, workExperienceId }) => {
  const [companyName, setCompanyName] = useState('');
  const [internshipType, setInternshipType] = useState('');
  const [companyLink, setCompanyLink] = useState('');
  const [internshipTitle, setInternshipTitle] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [projectDetails, setProjectDetails] = useState(['', '', '']);
  const [skillsUsed, setSkillsUsed] = useState('');
  const [certificateLink, setCertificateLink] = useState('');

  useEffect(() => {
    // Fetch existing work experience data for editing
    if (workExperienceId) {
      axios.get(`/api/work-experience/${workExperienceId}`)
        .then(response => {
          const data = response.data;
          setCompanyName(data.companyName);
          setInternshipType(data.internshipType);
          setCompanyLink(data.companyLink);
          setInternshipTitle(data.internshipTitle);
          setLocation(data.location);
          setStartDate(data.startDate);
          setEndDate(data.endDate);
          setCurrentlyWorking(data.currentlyWorking);
          setProjectDetails(data.projectDetails);
          setSkillsUsed(data.skills.join(', '));
          setCertificateLink(data.certificateLink);
        })
        .catch(err => {
          toast.error('Failed to fetch work experience details');
          console.error(err);
        });
    }
  }, [workExperienceId]);

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

  const handleSave = async (e) => {
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

    try {
      if (workExperienceId) {
        // Update existing work experience
        await axios.put(`${import.meta.env.VITE_API_URL}/student/updateWorkExperience/${workExperienceId}`, workExperienceDetails,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        toast.success('Work experience updated successfully');
      } else {
        // Add new work experience
        await axios.post(`${import.meta.env.VITE_API_URL}/student/addWorkExperience`, workExperienceDetails,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        toast.success('Work experience added successfully');
      }
      onClose(); // Close the modal after saving
    } catch (error) {
      toast.error('Failed to save work experience');
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 my-20">
      {/* Background blur */}
      <div
        className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="bg-white p-10 shadow-md rounded-md z-10 relative w-11/12 md:w-2/3 lg:w-1/2 max-h-screen overflow-y-auto" style={{
        scrollbarWidth: 'none'
      }}>
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
                placeholder={`Describe project ${index + 1}`}
                value={detail}
                onChange={(e) => handleProjectChange(index, e.target.value)}
                required
              />
              <FiDelete
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-red-500"
                onClick={() => deleteProjectPoint(index)}
              />
            </div>
          ))}
          <button
            className="text-techBlue-600 hover:text-techBlue-800"
            onClick={addNewProjectPoint}
            type="button"
          >
            + Add Project Point
          </button>
        </div>

        {/* Skills Used */}
        <div className="mb-5">
          <label className="font-semibold" htmlFor="skillsUsed">
            Skills Used (comma separated)*
          </label>
          <input
            className="py-2 px-4 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
            type="text"
            id="skillsUsed"
            placeholder="Type Skills Used"
            value={skillsUsed}
            onChange={(e) => setSkillsUsed(e.target.value)}
            required
          />
        </div>

        {/* Certificate Link */}
        <div className="mb-5">
          <label className="font-semibold" htmlFor="certificateLink">
            Certificate Link (Optional)
          </label>
          <input
            className="py-2 px-4 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
            type="text"
            id="certificateLink"
            placeholder="Enter Certificate Link"
            value={certificateLink}
            onChange={(e) => setCertificateLink(e.target.value)}
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            className="bg-techBlue-600 text-white px-5 py-2 rounded-md hover:bg-techBlue-700"
            onClick={handleSave}
          >
            {workExperienceId ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWorkExperienceForm;
