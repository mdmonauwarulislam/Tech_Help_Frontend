import { useEffect, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import axios from "axios";
import AddWorkExperienceForm from "./AddWorkExperienceForm";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { GoPaperclip } from "react-icons/go";
import { MdOutlineModeEdit } from "react-icons/md";

const AddExperienceDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(null); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [experienceToDelete, setExperienceToDelete] = useState(null); 

  // Open and close the add/edit modal
  const openModal = () => {
    setSelectedExperience(null); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Open and close delete confirmation modal
  const openDeleteModal = (experienceId) => {
    setExperienceToDelete(experienceId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setExperienceToDelete(null);
  };

  // Fetch all work experiences
  const getAllExperiences = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/student/getWorkExperiences`, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setExperiences(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load experiences.");
    }
  };

  // Delete work experience
  const deleteExperience = async (experienceId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/student/deleteWorkExperience/${experienceId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Experience deleted successfully.");
        getAllExperiences(); 
        closeDeleteModal();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete experience.");
    }
  };

  // Handle edit experience
  const handleEdit = (experience) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  // Fetch experiences on component mount
  useEffect(() => {
    getAllExperiences();
  }, []);

  return (
    <>
      {/* Add Experience Section */}
      <div className="flex items-center justify-between p-4 border border-gray-300 rounded-md shadow-md">
        <div className="flex items-center">
          <div className="mr-5">
            <FaFileAlt size={30} />
          </div>
          <div>
            <div className="text-lg font-semibold">Add Work Experience</div>
            <div className="text-sm text-gray-500">
              Your previous internship / full-time experiences
            </div>
          </div>
        </div>
        <button
          onClick={openModal}
          type="button"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-techBlue-600 focus:outline-none"
        >
          + Add new
        </button>
      </div>

      {/* Experience List */}
      <div className="">
        {experiences.length > 0 ? (
          experiences.map((experience) => (
            <div
              key={experience._id}
              className="flex items-center w-full justify-between mt-5 rounded-md px-10 py-5 border shadow-md border-gray-300"
            >
              <div className="w-full">
              <div className="flex justify-between items-end">
                <h1 className="text-2xl font-semibold">
                {experience.internshipTitle}
                </h1>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(experience)}
                    className="py-1 px-3 border-2 gap-1 items-center flex border-primary rounded-md text-primary text-center"
                  >
                    <MdOutlineModeEdit size={20} className="inline" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => openDeleteModal(experience._id)}
                    className="py-1 px-3 border-2 gap-1 items-center flex border-red-500 rounded-md text-red-500 text-center"
                  >
                    <span>Delete</span>
                  </button>
                </div>
              </div>
                <div className="text-sm text-gray-500">{experience.companyName} </div>
                <div className="text-sm text-gray-500">{experience.location} | {experience.internshipType} | {experience.startDate} - {experience.endDate}</div>
                <ul className="list-disc list-inside text-gray-500">
                {experience.projectDetails && experience.projectDetails.length > 0 ? (
                  experience.projectDetails.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))
                ) : (
                  <li>No projectDetails specified.</li>
                )}
              </ul>
              <p className="mt-4 text-blue-600 text-xl">
                  <Link src={experience.certificateLink} target="_blank" rel="noopener noreferrer">
                    <GoPaperclip />
                  </Link>
                
              </p>
                <div className="mt-3 flex space-x-2 text-gray-500">
                {experience.skillsUsed && experience.skillsUsed.length > 0 ? (
                  experience.skillsUsed.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-full"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span>No skills specified.</span>
                )}
              </div>
              </div>
          
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center mt-5">
            No work experiences added yet.
          </div>
        )}
      </div>

      {/* Render the Add/Edit Experience Form Modal */}
      <AddWorkExperienceForm
        isOpen={isModalOpen}
        onClose={closeModal}
        experience={selectedExperience} 
        refreshExperiences={getAllExperiences}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeDeleteModal}
          ></div>

          {/* Delete Confirmation Dialog */}
          <div className="bg-white p-8 rounded-md shadow-md z-10">
            <h2 className="text-xl font-semibold mb-4">Delete Experience</h2>
            <p>Are you sure you want to delete this experience?</p>
            <div className="flex justify-end mt-6">
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 text-black px-4 py-2 rounded-md mr-3"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteExperience(experienceToDelete)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddExperienceDetails;
