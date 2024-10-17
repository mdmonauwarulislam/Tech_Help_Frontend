/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { FiDelete } from "react-icons/fi";
import axios from 'axios';
import { toast } from 'react-toastify';

const AddResponsibilityForm = ({ isOpen, onClose, responsibilityData }) => {
  const [positionTitle, setPositionTitle] = useState('');
  const [responsibilities, setResponsibilities] = useState(['']);
  const [certificateLink, setCertificateLink] = useState('');
  const [skillsUsed, setSkillsUsed] = useState('');

  // Effect to populate form if editing
  useEffect(() => {
    if (responsibilityData) {
      setPositionTitle(responsibilityData.title);
      setResponsibilities(responsibilityData.responsibilities);
      setCertificateLink(responsibilityData.certificateLink);
      setSkillsUsed(responsibilityData.skills.join(', ')); 
    }
  }, [responsibilityData]);

  if (!isOpen) return null;

  const handlePositionTitleChange = (e) => {
    setPositionTitle(e.target.value);
  };

  const handleResponsibilityChange = (index, value) => {
    const newResponsibilities = [...responsibilities];
    newResponsibilities[index] = value;
    setResponsibilities(newResponsibilities);
  };

  const addNewResponsibilityPoint = () => {
    setResponsibilities([...responsibilities, '']);
  };

  const deleteResponsibilityPoint = (index) => {
    const newResponsibilities = responsibilities.filter((_, i) => i !== index);
    setResponsibilities(newResponsibilities);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const responsibilityDetails = {
      title: positionTitle,
      responsibilities,
      certificateLink,
      skills: skillsUsed.split(',').map(skill => skill.trim()),
    };

    // Validate input
    if (responsibilityDetails.skills.length < 2) {
      toast.error('Please enter at least 2 skills');
      return;
    }
    if (responsibilityDetails.title === '') {
      toast.error('Please enter the title');
      return;
    }
    if (responsibilityDetails.responsibilities[0] === '') {
      toast.error('Please enter the responsibilities');
      return;
    }

    try {
      // If responsibilityData is provided, it's an edit, otherwise it's a create
      if (responsibilityData) {
        await axios.put(`${import.meta.env.VITE_API_URL}/student/updateResponsibility/${responsibilityData._id}`, responsibilityDetails,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        toast.success('Responsibility updated successfully!');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/student/addResponsibility`, responsibilityDetails,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        toast.success('Responsibility added successfully!');
      }
      onClose(); 
    } catch (error) {
      toast.error('Error saving responsibility. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 py-16">
      {/* Background blur */}
      <div
        className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm "
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

        <h4 className="text-lg font-bold mb-4">Position of Responsibility</h4>

        {/* Title */}
        <div className="mb-5">
          <label className="font-semibold" htmlFor="positionTitle">
            Title*
          </label>
          <input
            className="py-2 px-4 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
            type="text"
            id="positionTitle"
            placeholder="For eg. VP of RK Hostel"
            value={positionTitle}
            onChange={handlePositionTitleChange}
            required
          />
        </div>

        {/* Responsibilities */}
        <div className="mb-5">
          <label className="font-semibold" htmlFor="responsibilities">
            Describe your POR*
          </label>
          {responsibilities.map((resp, index) => (
            <div key={index} className="relative mb-2">
              <input
                className="py-2 px-4 pr-10 text-[18px] rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
                type="text"
                placeholder={index === 0 ? 'What did you accomplish with this POR?' : 'Type something...'}
                value={resp}
                onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                required
              />
              {/* Delete icon */}
              {index >= 1 && (
                <button
                  type="button"
                  onClick={() => deleteResponsibilityPoint(index)}
                  className="absolute text-2xl right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <FiDelete />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addNewResponsibilityPoint}
            className="mt-3 border-2 w-full py-2 text-[18px] rounded-md font-semibold text-gray-700"
          >
            + New Point
          </button>
        </div>

        {/* Certificate Link */}
        <div className="mb-5">
          <label className="font-semibold">Certificate Link</label>
          <input
            className="py-2 px-4 text-[18px] mt-2 rounded-md border border-gray-300 outline-none w-full focus:border-techBlue-500"
            type="text"
            placeholder="Enter certificate link"
            value={certificateLink}
            onChange={(e) => setCertificateLink(e.target.value)}
          />
        </div>

        {/* Skills Used */}
        <div className="mb-5">
          <label className="font-semibold">Skills Used (min 2 skills)*</label>
          <input
            className="py-2 px-4 mt-2 rounded-md text-[18px] border border-gray-300 outline-none w-full focus:border-techBlue-500"
            type="text"
            placeholder="Type Skills Learned (comma separated)"
            value={skillsUsed}
            onChange={(e) => setSkillsUsed(e.target.value)}
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
            Save Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddResponsibilityForm;
